require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const transferHandle = require("./transferHandle");
const jurHandle = require("./jurHandle");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  "OPTIONS" === req.method ? res.sendStatus(200) : next();
});

app
  .get("/", (ignore, res) => res.send("It works!"))
  .post("/transfer", transferHandle)
  .post("/jur", jurHandle);

app.listen(port, () =>
  console.log(`WeChain node app listening on port ${port}!`)
);
