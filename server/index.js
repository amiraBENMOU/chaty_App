const express=require('express');
const app=express();
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors");
const passport=require('passport');
const passportLocal=require('passport-local').Strategy;
const cookieParser=require('cookie-parser')//for the authentifcation
const bcrypt =require('bcryptjs')//for hashing the info
const session=require('express-session')
const bodyParser=require('body-parser');
const { default: mongoose } = require('mongoose');
const User = require("./user");


//to redirect to the authentification page 



const server= http.createServer(app);

app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  })
);

//connect to mongoDB
mongoose.connect("mongodb+srv://amira:amira@2001@cluster0.fa6b1ao.mongodb.net/?retryWrites=true&w=majority",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => {
  console.log("Mongoose Is Connected");
}
);

const io =  new Server (server,{
  cors: {
    origin: "http://localhost:3000",//this is the location of the react app we are using
    method:["GET","POST"],
    credentials:true, //lazem f passportjs
  },
});


 io.on("connection",(socket) => {
  console.log('user connected',socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
  
 });

 //for login 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));

//login recall
app.post("/Home", (req, res, next) => {
  console.log(req.body);
})
//register recall
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:req.body.password,
      });
      await newUser.save();
      res.send("User Created");
    }
  )});

//get data into the discussion 
app.get ("/discussion", (req, res, next) => {
})
 

    
 
server.listen('3002',() =>{
  console.log("SERVER IS RUNNING");
});




