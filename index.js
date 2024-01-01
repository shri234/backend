let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

var app = express();
const server = http.createServer(app);
const io = socketIO(server);

const cron = require("node-cron");

const User = require("./services/auth/auth.controller");
const ticket_details = require("./services/ticket_details/ticket_details.controller");
const payment_details = require("./services/payment_details/payment_details.controller");

mongoose.connect(
  "mongodb+srv://shri0406:shri0406@cluster0.vebkxa6.mongodb.net/Proj"
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/user", User);
app.use("/ticket", ticket_details);
app.use("/payment", payment_details);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Broadcasting data to connected clients
  setInterval(() => {
    io.emit("dataUpdate", { message: "Data updated!" });
  }, 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

let port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Server has started! Listening on port ${port}`);
});
