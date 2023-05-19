import { useState, useEffect, useContext } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";
import Loader from "../components/Loader";
import ReloadContext from "../context/ReloadListContext";

const Home = () => {
  const ReloadCtx = useContext(ReloadContext);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/todos")
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [ReloadCtx.value]);

  if (loading) {
    return <Loader />
  }

  return <div>{error ? <p>Error...</p> : <TodoList todos={todos} />}</div>;
};

export default Home;
