import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
