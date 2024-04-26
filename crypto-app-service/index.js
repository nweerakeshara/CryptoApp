const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/crypto", require("./routes/crypto"));
app.use("/news", require("./routes/news"));


if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
  });
}
module.exports = app;
