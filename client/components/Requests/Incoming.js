import { Avatar, Typography, Box, IconButton } from "@mui/material";
import { useSWRConfig } from "swr";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const IncomingRequests = (item) => {
  const { mutate } = useSWRConfig();
  // eslint-disable-next-line
  const [incomingData] = useState(item.item);
  // console.log(incomingData);
  // const router = useRouter();

  //   const handleProfileClick = () => {
  //     axios
  //       .get("/api/profile/friends/friendinfo", {
  //         params: {
  //           displayName: incomingData.requester.displayName,
  //         },
  //       })
  //       .then((res) => {
  //         router.push(`/profile/${res.data.userId}`); // profile page url here
  //       });
  //   };

  const handleRejectReq = async () => {
    console.log("delete req");
    await axios({
      method: "put",
      url: "/api/requests/deleterequest",
      data: {
        questMentorshipRequestId: incomingData.questMentorshipRequestId,
      },
    }).then(() => {
      mutate(`/api/requests/mentorrequests`);
    });
  };

  const handleAcceptReq = async () => {
    await axios({
      method: "post",
      url: "/api/requests/acceptrequest",
      data: {
        questMentorshipRequestId: incomingData.questMentorshipRequestId,
        questId: incomingData.questId,
      },
    }).then(() => {
      mutate(`/api/requests/mentorrequests`);
    });
  };

  const firstIcon = (
    <IconButton onClick={handleAcceptReq}>
      <CheckCircleRoundedIcon />
    </IconButton>
  );
  const secondIcon = (
    <IconButton onClick={handleRejectReq}>
      <CancelRoundedIcon />
    </IconButton>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: "1.5rem",
        marginLeft: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        // onClick={handleProfileClick}
      >
        <Avatar
          sx={{
            backgroundColor: "primary.main",
          }}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "1rem" }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.25rem",
            }}
          >
            {incomingData.quest.wish}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.5",
            }}
          >
            Requested by {incomingData.partyLeader.displayName}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginRight: "1rem",
        }}
      >
        {firstIcon}
        {secondIcon}
      </Box>
    </Box>
  );
};

export default IncomingRequests;
