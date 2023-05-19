import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

const AddTodo = () => {
  const [tagCount, setTagCount] = useState([]);
  const [text, setText] = useState("");
  const [duration, setDuration] = useState("");
  const [repeat, setRepeat] = useState("");
  const navigate = useNavigate();

  const AddTodoHandler = (event) => {
    event.preventDefault();
    const tags = document.getElementsByClassName("tag-value");
    const tags_val = [];
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].children[1].children[0].value) {
        tags_val.push(tags[i].children[1].children[0].value);
      }
    }
    axios
      .post("http://localhost:3001/api/todos", {
        todo: {
          text: text,
          duration: duration,
          repeat: repeat,
          tags: tags_val,
        },
      })
      .then((res) => {
        console.log(res.data);
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
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const MoreTags = () => {
    setTagCount((prev) => prev.concat(prev.length + 3));
  };

  const LessTags = () => {
    setTagCount((prev) => prev.splice(0, prev.length - 1));
  }

  return (
    <div className="add-todo">
      <form onSubmit={AddTodoHandler}>
        <TextField
          label="Text"
          variant="outlined"
          className="inputs"
          required
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <TextField
            label="Duration (mins)"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setDuration(+e.target.value);
            }}
            required
          />
          <TextField
            label="Repeat (times)"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(e) => {
              setRepeat(+e.target.value);
            }}
            required
          />
        </div>
        <div id="tags">
          <TextField
            label="Tag 1"
            variant="outlined"
            className="inputs tag-value"
            required
          />
          <TextField
            label="Tag 2"
            variant="outlined"
            className="inputs tag-value"
            required
          />
          {tagCount.map((e, i) => {
            return (
              <TextField
                label={`Tag ${e}`}
                key={i}
                variant="outlined"
                className="inputs tag-value"
              />
            );
          })}
        </div>
        <Button onClick={MoreTags}>More</Button>
        <Button disabled={tagCount <= 2} onClick={LessTags}>Less</Button>
        <Button
          type="submit"
          className="inputs"
          variant="contained"
          disableElevation
          style={{ marginTop: "15px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddTodo;
