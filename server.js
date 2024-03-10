const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }))

// routes
const taskRouter = require("./routes/tasks");

app.use("/tasks", taskRouter)

app.listen(3000)