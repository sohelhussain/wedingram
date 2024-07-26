const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cyber = require("./routes/cyber");
const index = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/cyber", cyber);
app.get("/", index);


app.listen(port);
