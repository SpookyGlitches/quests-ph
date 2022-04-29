import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import CustomAvatar from "../Common/CustomAvatar";
import ImageProfileUpload from "./ImageProfileUpload";

export default function BasicInfo({ userId }) {
  const { data: myInfo } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );
  const [open, setOpen] = useState(false);

  const openImageUploadModal = () => {
    setOpen(true);
  };

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
      <Box
        sx={{
          position: "relative",
        }}
      >
        <CustomAvatar
          displayName={myInfo.displayName}
          image={myInfo.image}
          rootStyles={{
            height: "6rem",
            width: "6rem",
          }}
        />
        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 200,
            bottom: 0,
            backgroundColor: "grey.200",
            "&:hover": {
              backgroundColor: "grey.100",
            },
          }}
          onClick={openImageUploadModal}
          size="small"
        >
          <EditRoundedIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      </Box>

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
      <ImageProfileUpload
        open={open}
        setOpen={setOpen}
        image={myInfo.image}
        displayName={myInfo.displayName}
      />
      <Typography variant="body2">{myInfo.fullName}</Typography>
    </Box>
  );
}
