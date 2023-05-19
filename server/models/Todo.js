const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide a todo description (text)."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, "Please provide a todo duration."],
      min: [2, "Duration too short. Min 2 minute/s (got {VALUE})."],
    },
    tags: {
      type: Array,
      required: [true, "Please provide an array of todo tags."],
      validate: {
        validator: function (arr) {
          return arr.length >= 2;
        },
        message: (props) =>
          `Please provide at least 2 tags for the todo (got ${props.value.length})).`,
      },
    },
    repeat: {
      type: Number,
      required: [
        true,
        "Please provide how many times the todo should be repeated.",
      ],
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

exports.Todo = Todo;
