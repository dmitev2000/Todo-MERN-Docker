import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Tooltip } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import { useContext } from "react";
import ReloadContext from "../context/ReloadListContext";

const Todo = ({ todoProps }) => {
  const ReloadCtx = useContext(ReloadContext);

  const RepeatOnce = () => {
    axios
      .put(`http://localhost:3001/api/todos/${todoProps._id}`)
      .then((res) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: `${res.data}`,
        });
        ReloadCtx.updateValue();
      })
      .catch((err) => console.log(err));
  };

  const DeleteTodo = async () => {
    Swal.fire({
      title: "Delete todo?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#8b0000",
      cancelButtonColor: "#1769aa",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/api/todos/${todoProps._id}`)
          .then((res) => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `${res.data}`,
            });
            ReloadCtx.updateValue();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className={todoProps.completed ? "todo completed" : "todo"}>
      <div>
        <h3>{todoProps.text}</h3>
        <span>Progress: </span>
        <div className="pbar-wrapper">
          <ProgressBar
            bgColor="#1769aa"
            completed={Math.round(
              (todoProps.progress / todoProps.repeat) * 100
            )}
            margin="10px 0"
          />
          <Tooltip title="Repeat once">
            <button
              className="progress-btn"
              disabled={todoProps.completed}
              onClick={RepeatOnce}
            >
              <AddTaskIcon />
            </button>
          </Tooltip>
        </div>
      </div>
      <Tooltip title="Delete">
        <button className="delete" onClick={DeleteTodo}>
          <DeleteIcon fontSize="large" />
        </button>
      </Tooltip>
    </div>
  );
};

Todo.propTypes = {
  todoProps: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    repeat: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Todo;
