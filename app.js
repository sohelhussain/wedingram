// Load environment variables from .env file
require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRoute");
const cyberRouter = require("./routes/cyberRoute");
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute")
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const PORT = process.env.PORT || 8000; // Use the port from environment variables or default to 3000

require("./config/mongodb-connection");

// Set the view engine to EJS
app.set("view engine", "ejs");

//logger
const logger = require("morgan");
app.use(logger("short"));  


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
app.use("/user", userRouter);
app.use("/cyber", cyberRouter);
app.use("/admin", adminRouter);

app.use('*', (req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`this port is listening on ${PORT}`);
});
