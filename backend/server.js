const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT;

connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("please set to production"));
}

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).send("server works");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
