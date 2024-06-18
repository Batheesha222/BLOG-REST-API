const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const connectMongodb = require("./init/mongodb");
const { authRoute, categoryRoute, fileRoute, postRoute } = require("./routes");
const morgan = require("morgan");
const { errorHandler } = require("./middleware");
const notfound = require("./controllers/notFound");

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
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/posts", postRoute);

//not found route
app.use("*", notfound);

//errorHandlers middleware
app.use(errorHandler);

module.exports = app;
