import { Paper, Box, Avatar, Typography } from "@mui/material";

export default function CreatePost({ onCreatePostClick }) {
  return (
    <Paper
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        paddingX: 3,
        paddingY: 2,
        paddingLeft: 2,
        marginBottom: 3,
        gap: 2,
      }}
    >
      <Box sx={{}}>
        <Avatar sx={{}}>X</Avatar>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          height: 50,
          borderRadius: 1,
          paddingX: 1,
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
        }}
        onClick={onCreatePostClick}
      >
        <Typography variant="subtitle2" sx={{ color: "grey.700" }}>
          Create a Post
        </Typography>
      </Box>
    </Paper>
  );
}
