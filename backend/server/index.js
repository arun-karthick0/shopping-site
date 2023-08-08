require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        console.log(item);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              productName: item.productName,
              quantity: item.quantity,
              price: item.price,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),

      success_url: "http://localhost:3000/cart/success",
      cancel_url: "http://localhost:3000/cart/cancel",
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(4000, () => console.log("Running on port 4000"));
