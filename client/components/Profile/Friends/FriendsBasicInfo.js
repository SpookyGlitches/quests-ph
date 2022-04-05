import { Box, Avatar, Typography } from "@mui/material";
import useSWR from "swr";

export default function FriendsBasicInfo({ userId }) {
  const { data: friendInfos } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );
  if (!friendInfos) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }
  const letter = friendInfos.displayName.charAt(0);
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
        {letter}
      </Avatar>
      <Typography
        color="primary"
        variant="h5"
        justifyContent="center"
        align="center"
        sx={{ wordBreak: "break-all" }}
      >
        {friendInfos.displayName}
      </Typography>
      <Typography variant="body2">{friendInfos.fullName}</Typography>
    </Box>
  );
}
