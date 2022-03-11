import { Typography, Box } from "@mui/material";

const DataFieldHolder = (props) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", paddingTop: "1.5rem" }}
    >
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "600",
        }}
      >
        {props.field}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "normal",
        }}
      >
        {props.value}
      </Typography>
    </Box>
  );
};

export default DataFieldHolder;
