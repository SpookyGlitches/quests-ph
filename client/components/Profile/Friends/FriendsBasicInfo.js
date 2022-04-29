import { Box, Typography, Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";

import useSWR from "swr";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import CustomAvatar from "../../Common/CustomAvatar";

export default function FriendsBasicInfo({ userId }) {
  const { data: friendInfos } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );
  const session = useSession();
  const mentor = session?.data?.user?.role === "mentor";

  const { data: userExperience } = useSWR(
    userId ? `/profile/${userId}/points` : null,
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
      <CustomAvatar
        displayName={friendInfos.displayName}
        image={friendInfos.image}
        rootStyles={{
          backgroundColor: "primary.main",
          height: "6rem",
          width: "6rem",
        }}
      />

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
          {friendInfos.displayName}
        </Typography>
        {friendInfos.isActive === "1" && friendInfos.role === "mentor" ? (
          <VerifiedUserRoundedIcon color="primary" sx={{ ml: 1 }} />
        ) : null}
      </div>

      <Typography variant="body2">{friendInfos.fullName}</Typography>
    </Box>
  );
}
