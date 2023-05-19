import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import AddTodo from "../views/AddTodo";
import EditTodo from "../views/EditTodo";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-todo" element={<AddTodo />} />
      <Route path="/edit/:id" element={<EditTodo />} />
    </Routes>
  )
}

export default RoutesComponent;