const {
  AddTodo,
  GetTodos,
  DeleteTodo,
  UpdateProgress,
} = require("../controllers/TodoController");

const router = require("express").Router();

router.post("/", AddTodo);

router.get("/", GetTodos);

router.delete("/:id", DeleteTodo);

router.put("/:id", UpdateProgress);

exports.todo_router = router;
