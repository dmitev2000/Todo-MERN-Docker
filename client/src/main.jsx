import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import RoutesComponent from "./components/RoutesComponent";
import Navbar from "./components/layout/Navbar";
import { ReloadContextProvider } from "./context/ReloadListContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <ReloadContextProvider>
      <RoutesComponent />
    </ReloadContextProvider>
  </BrowserRouter>
);
