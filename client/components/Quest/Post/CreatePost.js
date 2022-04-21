import { Paper, Avatar, Typography } from "@mui/material";

export default function CreatePost({
  onCreatePostClick,
  rootStyles,
  disabled,
}) {
  const createNewPost = (event) => {
    if (disabled) {
      return;
    }
    onCreatePostClick(event);
  };
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        paddingY: 2,
        paddingX: 2,
        gap: 1,
        ...rootStyles,
      }}
    >
      <Avatar>X</Avatar>
      <Paper
        sx={{
          flexGrow: 1,
          marginLeft: 1,
          height: 50,
          paddingX: 1,
          display: "flex",
          cursor: !disabled && "pointer",
          alignItems: "center",
          backgroundColor: disabled && "grey.200",
        }}
        onClick={createNewPost}
      >
        <Typography variant="body2">Create a new post</Typography>
      </Paper>
    </Paper>
  );
}
