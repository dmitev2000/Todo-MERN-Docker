const { Todo } = require("../models/Todo");

exports.AddTodo = async (req, res, next) => {
  try {
    const { text, duration, tags, repeat } = req.body.todo;

    const newTodo = new Todo({
      text: text,
      duration: duration,
      tags: tags,
      repeat: repeat,
    });

    await newTodo.save();

    res.status(201).json("Todo added.");
  } catch (error) {
    next(error);
  }
};

exports.GetTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

exports.DeleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    res.status(200).json("Todo removed.");
  } catch (error) {
    next(error);
  }
};

exports.UpdateProgress = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      return res.status(404).json("Todo not found.");
    }

    const updatedTodo = {
      progress: todo.progress + 1,
      completed: todo.progress + 1 === todo.repeat ? true : false,
    };

    await Todo.findOneAndUpdate({ _id: req.params.id }, { $set: updatedTodo });

    res.status(200).json("Progress updated.");
  } catch (error) {
    next(error);
  }
};
