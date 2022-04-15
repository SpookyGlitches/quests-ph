import { Box, Avatar, Typography } from "@mui/material";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import useSWR from "swr";

export default function BasicInfo({ userId }) {
  const { data: myInfo } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );
  if (!myInfo) {
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

  const letter = myInfo.displayName.charAt(0).toUpperCase();
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          color="primary"
          variant="h5"
          justifyContent="center"
          align="center"
          sx={{ wordBreak: "break-all", ml: 1 }}
        >
          {myInfo.displayName}
        </Typography>
        {myInfo.isActive === "1" && myInfo.role === "mentor" ? (
          <VerifiedUserRoundedIcon color="primary" sx={{ ml: 1 }} />
        ) : null}
      </div>

      <Typography variant="body2">{myInfo.fullName}</Typography>
    </Box>
  );
}
