const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleWare/errorMiddleware");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

//Connect to database
connectDB();

const app = express();
app.use(express.json()); //we want to take json from the user
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
