import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div style={{maxWidth: "500px", margin: "20px auto"}}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link className="nav-link" to="/">
                Todos
              </Link>
            </Typography>
            <Tooltip title="Add todo">
              <Link className="nav-link" to="/add-todo">
                <AddIcon />
              </Link>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
