const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { db } = require("./db/db");
const { todo_router } = require("./routes/TodoRoutes.js");
const { ErrorHandler } = require("./middlewares/ErrorHandler.js");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", todo_router);

app.get("/", (req, res) => {
  res.send("Hello! This is ToDo api.");
});

app.use(ErrorHandler);

try {
  db.once("open", () => {
    console.log("MongoDB connected.");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}.`);
    });
  });
} catch (error) {
  console.error(error);
}
