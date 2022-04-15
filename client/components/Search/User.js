import { Paper, Avatar, Box, Typography, IconButton } from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { useRouter } from "next/router";

export default function User({ user }) {
  const router = useRouter();
  const navigateToProfile = () => {
    router.push(`/profile/${user.userId}`);
  };
  return (
    <Paper
      sx={{
        display: "flex",
        gap: 2,
        padding: 2,
        alignItems: "center",
        flexWrap: "wrap",
        cursor: "pointer",
      }}
      onClick={navigateToProfile}
    >
      <Avatar sx={{ backgroundColor: "primary.main" }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {user.displayName}
        </Typography>
        <Typography variant="body2">{user.fullName}</Typography>
      </Box>
      <Box>
        <IconButton>
          <NavigateNextRoundedIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
