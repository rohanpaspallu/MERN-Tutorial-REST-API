const express = require("express");
const dotenv = require("dotenv").config();
const goalRoutes = require("./routes/goalRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/goals", goalRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).send("server works");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
