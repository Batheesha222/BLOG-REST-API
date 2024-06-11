const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const connectMongodb = require("./init/mongodb");
const { authRoute } = require("./routes");
const morgan = require("morgan");
//init app
const app = express();

//connect database
connectMongodb();

//third party middleware
app.use(express.json({ limit: "500mb" })); //limit 500mb to passing DATA
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true })); //extended:true because provide a warning
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);

module.exports = app;
