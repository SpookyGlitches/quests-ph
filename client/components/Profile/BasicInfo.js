import { Box, Avatar, Typography, Tooltip } from "@mui/material";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function BasicInfo({ userId }) {
  const { data: myInfo } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );

  const session = useSession();
  const mentor = session?.data?.user?.role === "mentor";

  const { data: userExperience } = useSWR(
    userId ? `/profile/${userId}/points` : null,
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
        borderRadius: 1,
        border: "1px solid rgba(0, 0, 0, 0.12)",
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
      <Tooltip
        describeChild
        title={
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "regular" }}>
              Points: {userExperience?.totalPoints || 0}
            </Typography>
            {!mentor && (
              <Typography variant="body2" sx={{ fontWeight: "regular" }}>
                Tasks Points: {userExperience?.tasksPoints || 0}
              </Typography>
            )}
            <Typography variant="caption" sx={{ fontWeight: "regular" }}>
              {userExperience?.nextLevelLackingPoints || 10} points left to
              reach Level {userExperience?.nextLevel || 1}
            </Typography>
          </Box>
        }
      >
        <Typography variant="body2" sx={{ fontWeight: "medium", mt: 1 }}>
          Level {userExperience?.level || 1}
        </Typography>
      </Tooltip>

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
