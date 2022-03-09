import { Box, Avatar, Typography } from "@mui/material";

export default function BasicInfo() {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: "primary.main",
          height: "6rem",
          width: "6rem",
        }}
      >
        Ina
      </Avatar>
      <Typography
        color="primary"
        variant="h5"
        justifyContent="center"
        align="center"
        sx={{ wordBreak: "break-all" }}
      >
        Ninomae Inanis
      </Typography>
      <Typography variant="body2">inainainaaaaa</Typography>
    </Box>
  );
}
