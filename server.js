require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// my routes
const contactRoutes = require("./routes/contact");
const authRoutes = require("./routes/auth");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

//My Routes
app.use("/api", contactRoutes);
app.use("/api", authRoutes);

//PORT
const port = 3000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
