const express = require("express");
const app = express();
const morgan = require("morgan");
const UserRoutes = require("./api/routes/UserRoutes");
const SheetRoutes = require("./api/routes/SheetRoutes");

app.use(morgan("dev"));

app.use("/api/user", UserRoutes);
app.use("/api/sheet", SheetRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Enter Correct Route" });
});
module.exports = app;
