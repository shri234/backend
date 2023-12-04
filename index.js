let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
cors = require("cors");
const cron = require("node-cron");

const User = require("./services/auth/auth.controller");
const ticket_details = require("./services/ticket_details/ticket_details.contrroller");
const payment_details = require("./services/payment_details/payment_details.controller");

var app = express();

mongoose.connect(
  "mongodb+srv://shri0406:shri0406@cluster0.vebkxa6.mongodb.net/Proj"
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, changed!");
});
app.use("/user", User);
app.use("/ticket", ticket_details);
app.use("/payment", payment_details);

let port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log(`Server Has Started! at port ${port}`);
});
