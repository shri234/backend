let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
cors = require("cors");
const cron=require("node-cron")

const User = require("./services/auth/auth.controller");
const ticket_details = require("./services/ticket_details/ticket_details.contrroller");
const payment_details = require("./services/payment_details/payment_details.controller");
const all_ticket=require("./services/ticket_details/ticket_details.service")
var app = express();

mongoose.connect(
  "mongodb+srv://shri0406:shri0406@cluster0.vebkxa6.mongodb.net/Proj"
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use("/user", User);
app.use("/ticket", ticket_details);
app.use("/payment", payment_details);

cron.schedule('30 1 * * *', async () => {
  console.log('Cron job running every day at 5 PM IST');
 await  all_ticket.updateTicket()
});

let port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log(`Server Has Started! at port ${port}`);
});
