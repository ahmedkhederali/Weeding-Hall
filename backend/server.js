require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const Port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connect = require("./db/connect");
const cloudinary = require("cloudinary");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

mongoose.set("strictQuery", true);
//MiddleWare

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan("tiny"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRT,
});

//  Routes
app.get("/", (req, res) => {
  res.status(200).json({ mag: "Done Welcome" });
});

app.use("/api/v1/user", require("./routes/UserRoute"));
app.use("/api/v1/hall", require("./routes/HallRoute"));
app.use("/api/v1/comments", require("./routes/commentRoute"));
app.use("/api/v1/ratings", require("./routes/ratingRoutes"));
app.use("/api/v1/report", require("./routes/ReportRoute"));
app.use("/api/v1/book", require("./routes/BookRoute"));
// for books 
app.use("/api/v1/books", require("./routes/BooksRoutes"));
app.use("/api/v1/articls", require("./routes/ArticleRoutes"));



// STRIPE CONNECTION
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { price } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(price),
      currency: "USD",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

const start = async () => {
  try {
    // connectDB
    await connect(process.env.MONGO_URI);
    const server = app.listen(Port, () =>
      console.log(`Server is listening port ${Port}...`)
    );
    // //socket.io
    // const io = require("socket.io")(server, {
    //   pingTimeout: 60000,
    //   cors: {
    //     origin: "http://localhost:3000",
    //   },
    // });

    // // To make connection
    // io.on("connection",(socket)=>{
    //   console.log("connect")
    //   // setup used To create new socket
    //   socket.on('setup',(userData)=>{
    //     console.log("line 81" , userData)
    //     socket.join(userData._id);
    //     socket.emit("connected")
    //   })
    //  // create a room for chat 
    //   socket.on("join chat" ,(room)=>{
    //     socket.join(room);//make a unique room  for selected users
    //     console.log("User Joined Room " + room)
    //   })
    //   // handle Typing , stop Typing
    //   socket.on("typing", (room) => socket.in(room).emit("typing"));
    //   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    //   //handle New Message
    //   socket.on("new message", (newMessageRecieved) => {
    //     var chat = newMessageRecieved.chat; 
    //     if (!chat.users) return console.log("chat.users not defined");
    //     chat.users.forEach((user) => {
    //      //to didn't send to me 
    //       if (user._id == newMessageRecieved.sender._id) return;

    //       //loop in users and execute this emit on each user
    //        socket.in(user._id).emit("message recieved", newMessageRecieved);
    //      });
    //   });
    //   socket.off("setup", () => {
    //     console.log("USER DISCONNECTED");
    //     socket.leave(userData._id);
    //   });

    // })
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
