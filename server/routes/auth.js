const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const Token = require("../models/Token");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../routes/verifyToken");

// Node mail Router
// initialize nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "niteshreddy6690@gmail.com",
    pass: "eklzqdubpumjszpv",
  },
});
// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

// REGISTER
router.post("/register", async (req, res) => {
  const { firstName, password, email, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exist" });
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      name: firstName,
      email: email,
      password: hashedPassword,
      isAdmin,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    transporter.sendMail(
      {
        from: "niteshreddy6690@gmail.com",
        to: savedUser.email,
        subject: "Sending Email using Node.js",
        html: "<h1>Welcome to Shopify</h1>",
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(422)
        .json({ message: "Please enter your email address  or password" });
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const AccessToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "30d" }
    );
    const RefreshToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "30d" }
    );
    const userToken = await Token.findOne({ userId: existingUser._id });
    if (userToken) {
      await userToken.remove();
    }
    await new Token({ userId: existingUser._id, token: RefreshToken }).save();

    // refreshTokens.push(RefreshToken);
    const { ...others } = existingUser._doc;
    res.status(200).json({
      ...others,
      AccessToken,
      RefreshToken,
      message: "Successfully signed in",
    });

    // if(isPasswordCorrect){
    //   console.log(first)
    // }

    // User.findOne({ email: email }, async (err, user) => {
    //   if (err) res.status(500).json(err);
    //   else {
    //     if (user) {
    //       const matchedPassword = await bcrypt.compare(user.password, password);
    //       // console.log(matchedPassword);
    //       if (!matchedPassword == false) {
    //         res.status(500).json({ message: "invalid password" });
    //       }

    //       const AccessToken = await jwt.sign(
    //         { id: user._id, isAdmin: user.isAdmin },
    //         process.env.JWT_SECRET_KEY,
    //         { expiresIn: "7d" }
    //       );
    //
    //     }
    //   }
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// REFRESH TOKEN
router.post("/token", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  // console.log(refreshToken);
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  const token = await Token.findOne({ token: refreshToken });

  if (!token)
    return res.status(403).json({ message: "does not contain refresh token" });
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    async (err, payload) => {
      if (err)
        return res
          .status(500)
          .json({ message: "error verifying refresh token" });

      // console.log("payload :" + JSON.stringify(payload));

      const AccessToken = jwt.sign(
        {
          id: payload.id,
          email: payload.email,
          isAdmin: payload.isAdmin,
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: "30m" }
      );
      res.status(200).json({ AccessToken });
    }
  );
});

router.get("/logout", (req, res) => {
  res.redirect("/home");
});

// Google Authentication Service
// User.plugin(passportLocalMongoose);
// User.plugin(findOrCreate);

router.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "677733913190-jh5baffre20niklpbgaievpfnbjvcgf4.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/api/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        {
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        },
        function (err, user) {
          console.log(user);
          return cb(err, user);
        }
      );
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("Sucessfukkly logged in");
    res.redirect("http://localhost:3000/home");
  }
);

router.post("/reset-password", async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    return res.status(404).json({ message: "No users found with this email" });
  } else {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_PASSWORDRESET_SECRET_KEY,
      { expiresIn: "10m" }
    );

    const savedToken = await new Token({
      userId: user._id,
      token: token,
    }).save();
    console.log(savedToken);
    const resetPasswordUrl = `http://localhost:3000/auth/newpassword?token=${token}`;
    const mailOptions = {
      from: "niteshreddy6690@gmail.com",
      to: user.email,
      subject: "Password Reset",
      template: "index", // the name of the template file i.e index.handlebars
      context: {
        resetPasswordUrl: resetPasswordUrl,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "Error Occurred while sending email",
          error: error,
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "sent a mail to the user" });
      }
    });
  }
});

router.post("/new-password", async function (req, res) {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  jwt.verify(
    sentToken,
    process.env.JWT_PASSWORDRESET_SECRET_KEY,
    async (err, verifiedUser) => {
      if (err) {
        return res.status(403).json("Token is invalid");
      }
      console.log("verifieduser : " + JSON.stringify(verifiedUser));
      const token = await Token.findOne({ userId: verifiedUser.id });
      if (!token) {
        return res.status(422).json({ message: "Try again Session expired" });
      }

      console.log(token);
      User.findById(verifiedUser.id).then((user) => {
        if (!user) {
          return res.status(422).json({ message: "User not found" });
        }
        bcrypt.hash(newPassword, 8).then((hash) => {
          user.password = hash;
          user.save().then((savedUser) => {
            console.log(savedUser);
            return res
              .status(200)
              .json({ message: "Password updated successfully" });
          });
        });
      });
    }
  );
});

router.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });
    const refreshTokenDoc = await Token.findOne({ token: refreshToken });
    if (!refreshTokenDoc)
      return res
        .status(403)
        .json({ message: "does not contain refresh token" });
    refreshTokenDoc.remove();
    return res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
