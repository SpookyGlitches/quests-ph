import {
  Typography,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSWRConfig } from "swr";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const IncomingRequests = (item) => {
  const [open, setOpen] = useState(false);
  const handleQuestClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useSWRConfig();
  // eslint-disable-next-line
  const [incomingData] = useState(item.item);

  const handleRejectReq = async () => {
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
      >
        <ImportContactsRoundedIcon
          style={{ height: 40, width: 40 }}
          sx={{
            color: "primary.main",
          }}
          onClick={handleQuestClick}
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5">{incomingData.quest.wish}</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              Hello {incomingData.mentor.displayName} &#128075;
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>{incomingData.partyLeader.displayName}</strong> wants you
              to be their mentor for the Quest with the Wish{" "}
              <strong>{incomingData.quest.wish}</strong>.
            </Typography>
            <DialogContentText id="alert-dialog-description" sx={{ mt: 2 }}>
              Requested on:{" "}
              {format(new Date(incomingData.createdAt), "MMMM d, yyyy")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default IncomingRequests;
