import { Box, CircularProgress } from "@mui/material";

export default function CustomCircularProgress({ rootStyles }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        ...rootStyles,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
