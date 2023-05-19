import PropTypes from "prop-types";
import Todo from "./Todo";

const TodoList = ({ todos }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => {
        return <Todo todoProps={todo} key={todo._id} />;
      })}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
