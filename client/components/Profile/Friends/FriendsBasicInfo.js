import { Box, Avatar, Typography } from "@mui/material";

export default function friendsBasicInfo({ displayName, fullName }) {
  //   const letter = displayName.charAt(0);

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
      />
      <Typography
        color="primary"
        variant="h5"
        justifyContent="center"
        align="center"
        sx={{ wordBreak: "break-all" }}
      >
        {displayName}
      </Typography>
      <Typography variant="body2">{fullName}</Typography>
    </Box>
  );
}
