const express = require("express");
const app = express();

//Routes
const routes = require("./routes/routes");

//Database
const db = require("./DB/dbConnection");

const users = require("./models/userSchema");
const candidate = require("./models/candidateSchema");

app.set("view engine", "ejs");

app.use(express.static('public')); 
app.use(express.json());

app.use("/",routes);


app.listen(3000, ()=> 
{
    console.log("server is Running");
});