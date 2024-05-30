const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db");
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
dotenv.config();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors())
app.use("/user",userRoutes);
app.use("/account",accountRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to Paytm");
})

 
dbConnect();
app.listen(port, () => {
    console.log('Server is running on port'+ port);
});
