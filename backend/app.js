const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require('fs');
const adminRoutes = require("./routes/admin");
const connectDB = require("./config/database");
const cors = require('cors')

app.use(cors())

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

connectDB()
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/admin", adminRoutes);
//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
