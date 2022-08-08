const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);
// const stripe = require("stripe")(
//   "sk_test_51LDvF1SGIotoqrSHGT41c2uuVumwRyS9xH3WEfuDKVcynOHt4m5fgegUfAVYVePvFz8dVMxbCD61W3tmoSAtXxos00RjRqSvlQ"
// );

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) return res.status(500).json(stripeErr);
      res.status(200).json(stripeRes);
    }
  );
});

module.exports = router;
