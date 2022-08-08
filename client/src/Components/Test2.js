import { useState } from "react";
import styled from "styled-components";
// import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { login, googleLogin } from "../redux/apiCalls";
// import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogo from "../assets/googlelogo.png";
import { Link } from "react-router-dom";
import { TextField, Typography, Paper } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  min-width: 100%;
  height: 500px;
  @media (min-width: 0px) {
    min-width: 444px;
  }
`;
const WrapperAvatar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  overflow: hidden;
  position: relative;
  font-size: 1.25rem;
  align-items: center;
  flex-shrink: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  margin: 8px;
  background-color: #f50057;
`;
const SVG = styled.svg`
  fill: white;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  padding: 25px;
  height: 1.1876em;
  margin-bottom: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  &:focus {
    border: 1px solid blue;
    border-radius: 5px;
  }
`;
const Span = styled.span`
  color: blue;
`;
const Button = styled.button`
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
`;
const Hr = styled.hr`
  width: 100%;
  color: black;
`;
const GoogleLoginWrapper = styled.div`
  width: 40%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 0.5px solid rgb(56, 57, 59);
  font-family: "Euclid Circular A", Akzidenz, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  &:hover {
    box-shadow: rgb(232 236 235) 0px 0px 0px 3px;
    border-color: rgb(136, 147, 151);
  }
`;

const GoogleButton = styled.button`
  border: none;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  background-color: transparent;
  font-size: 16px;
  line-height: 28px;
  text-shadow: none;
  text-align: center;
  text-transform: none;
`;
const GoogleImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  align-items: center;
  margin: 0px;
`;

const NavLink = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: white;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 5px;
`;

const Error = styled.span`
  color: Red;
  font-size: 12px;
`;
const initialState = {
  email: "",
  password: "",
};

const Test2 = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const responseGoogle = (response) => {
    console.log(response);
  };
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  console.log(isFetching);
  const handelClickGoogle = async (e) => {
    e.preventDefault();
    window.open("http://localhost:8080/api/auth/google", "_self");
    // googleLogin(dispatch);
  };
  const handelClick = (e) => {
    e.preventDefault();
    login(dispatch, formData);

    // const result = axios
    //   .post("http://localhost:8080/api/auth/login", formData)
    //   .then((response) => {
    //     localStorage.setItem("AccessToken", response.data.AccessToken);
    //     localStorage.setItem("RefreshToken", response.data.RefreshToken);
    //     console.log(response);
    //     navigate("/home");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <Container>
      <Wrapper>
        <WrapperAvatar>
          <Avatar>
            <SVG focusable="false" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </SVG>
          </Avatar>
          <Title>Sign In</Title>
        </WrapperAvatar>

        <Form onSubmit={handelClick}>
          <FormInput>
            <Input
              name="email"
              placeholder="Enter your email address"
              onChange={handelChange}
            />
            {/* <TextField
              sx={{ m: 2 }}
              name="email"
              type="email"
              variant="outlined"
              label="Email Address"
              required
              fullWidth
              onChange={handelChange}
            /> */}
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handelChange}
            />
            {/* <TextField
              name="password"
              type="password"
              variant="outlined"
              label="password"
              required
              fullWidth
              onChange={handelChange}
            /> */}
            <Button type="submit">LOGIN</Button>
          </FormInput>
        </Form>
        {error ? <Error>Something went wrong.........!</Error> : ""}
        {/* <GoogleLogin
            clientId="677733913190-78m2l9r4ncgom5gsm1a0saip9is6ojo9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
        <Hr />
        <GoogleLoginWrapper>
          <GoogleImg src={GoogleLogo} />
          <GoogleButton onClick={handelClickGoogle}>
            LogIn with Google
          </GoogleButton>
        </GoogleLoginWrapper>
        {/* <a href="/auth/google">google</a> */}
        <NavLink
          to={`/auth/resetpassword`}
          style={{ textDecoration: "none", color: "black" }}
        >
          Forgot password?
        </NavLink>
        <NavLink
          to={`/register`}
          style={{ textDecoration: "none", color: "black" }}
        >
          Don't have an account? <Span>Signup</Span>
        </NavLink>
      </Wrapper>
    </Container>
  );
};

export default Test2;
