const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_middleware/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/questions", require("./questions/question.controller"));
app.use("/categories", require("./categories/categories.controller"));
app.use("/exams", require("./exams/exam.controller"));
app.use("/results", require("./results/result.controller"));
app.use("/games", require("./games/games.controller"));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 8888;
app.listen(port, () => console.log("Server listening on port " + port));
