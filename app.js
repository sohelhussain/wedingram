// Load environment variables from .env file
require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRoute");
const cyberRouter = require("./routes/cyberRoute");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000

require("./config/mongodb-connection");

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SECRET_KEY,
  })
);
app.use(flash());

app.use("/", indexRouter);
app.use("/cyber", cyberRouter);

app.listen(PORT, () => {
  console.log(`this port is listening on ${PORT}`);
});
