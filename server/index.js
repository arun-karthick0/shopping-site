const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
const CheckoutSession = require("./schema.js");
const cors = require("cors");
app.use(express.json());
const PORT = 8756;
connection = process.env.CONNECTION_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://shopping-site-001.netlify.app",
  "https://shopping-site-002.netlify.app",
];
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.get("/", (req, res) => {
  res.json("welcome");
});

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.post("/create-checkout-session", async (req, res) => {
  const email = req.body.data.user;
  const product = req.body.data.cartItems;
  const line_items = product.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  try {
    const checkoutSessions = await Promise.all(
      product.map(async (item) => {
        const existingRecord = await CheckoutSession.findOne({
          email: email,
          productName: item.productName,
        });

        if (existingRecord) {
          // Update the quantity
          existingRecord.productQty += item.qty;
          existingRecord.totalPrice += item.price * item.qty;
          await existingRecord.save();
        } else {
          // Insert a new record
          const newCheckoutSession = new CheckoutSession({
            email: email,
            productName: item.productName,
            productQty: item.qty,
            productPrice: item.price,
            totalPrice: item.price * item.qty,
            paymentMode: "card",
          });
          await newCheckoutSession.save();
        }

        return item;
      })
    );

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "https://shopping-site-002.netlify.app/cart/success",
      cancel_url: "https://shopping-site-002.netlify.app/cart/cancel",
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getdata", async (req, res) => {
  const email = req.query.email; // Retrieve email from query parameters

  try {
    const data = await CheckoutSession.find({ email: email });
    console.log(data);
    if (data.length === 0) {
      res.status(404).json({ error: "No data found for this email" });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

mongoose
  .connect(connection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
  .catch((err) => console.log(err));
