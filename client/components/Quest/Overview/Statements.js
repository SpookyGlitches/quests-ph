import {
  Box,
  Stack,
  Typography,
  IconButton,
  Popper,
  Fade,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useContext, useEffect, useState } from "react";
import MemberStatement from "./MemberStatement";
import { QuestContext } from "../../../context/QuestContext";
import WoopModal from "../WoopModal";

const titleTypographyProps = {
  sx: {
    marginBottom: "0.5rem",
  },
  variant: "h5",
  fontWeight: "medium",
};

export default function Statements() {
  const { data: session } = useSession();

  const quest = useContext(QuestContext);

  const [partyMembers, setPartyMembers] = useState([]);
  const [anchorWoop, setAnchorWoop] = useState(null);
  const [openWoopPopper, setOpenWoopPopper] = useState(false);
  const [woopModalDetails, setWoopModalDetails] = useState({
    loading: false,
    title: "Edit Quest Overview",
    open: false,
    statement: {
      outcome: "",
      obstacle: "",
      plan: "",
      wish: quest.wish,
    },
    partyMemberId: null,
  });

  const handleWoopPopperClick = (event) => {
    setAnchorWoop(event.currentTarget);
    setOpenWoopPopper(!openWoopPopper);
  };

  const fetchPartyMembers = async () => {
    try {
      const {
        data: { partyMembers: results },
      } = await axios.get(
        `/api/quests/${quest.questId}/partyMembers?excludeMentor=true`,
      );
      setPartyMembers(results);
    } catch (error) {
      alert("error");
      console.error(error);
    }
  };

  const editWoop = async (values) => {
    try {
      await axios.put(
        `/api/quests/${quest.questId}/partyMembers/${woopModalDetails.partyMemberId}`,
        values,
      );
      // temporary
      await fetchPartyMembers();
      setWoopModalDetails((prev) => ({ ...prev, open: false }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (partyMembers.length === 0 || !session) return;
    // is this badd? 🙂
    console.log(partyMembers);
    const currentMember = partyMembers.find(
      (item) => item.userId === session.userId,
    );
    if (!currentMember) return;
    setWoopModalDetails((prev) => ({
      ...prev,
      statement: {
        wish: quest.wish,
        outcome: currentMember.outcome,
        obstacle: currentMember.obstacle,
        plan: currentMember.plan,
      },
      partyMemberId: currentMember.partyMemberId,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partyMembers]);

  useEffect(() => {
    if (quest && quest.questId) fetchPartyMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest]);

  const toggleWoopModal = () => {
    setWoopModalDetails((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: "2rem",
        borderRadius: 2,
        marginBottom: "1.3rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" color="primary">
          Overview
        </Typography>
        <IconButton onClick={handleWoopPopperClick}>
          <MoreHorizRoundedIcon />
        </IconButton>
      </Box>

      <Stack spacing={4} sx={{ marginTop: "1rem" }}>
        <div>
          <Typography {...titleTypographyProps}>⭐ Wish</Typography>
          <Typography variant="body1">{quest.wish}</Typography>
        </div>
        <div>
          <Typography {...titleTypographyProps}>🎁 Outcome</Typography>
          {partyMembers.map((item) => (
            <MemberStatement
              text={item.outcome}
              name={item.user.name}
              key={item.partyMemberId}
            />
          ))}
        </div>
        <div>
          <Typography {...titleTypographyProps}>🗻 Obstacle</Typography>
          {partyMembers.map((item) => (
            <MemberStatement
              text={item.obstacle}
              name={item.user.name}
              key={item.partyMemberId}
            />
          ))}
        </div>
        <div>
          <Typography {...titleTypographyProps}>📒 Plan</Typography>
          {partyMembers.map((item) => (
            <MemberStatement
              text={item.plan}
              name={item.user.name}
              key={item.partyMemberId}
            />
          ))}
        </div>
      </Stack>
      <WoopModal
        handleOk={editWoop}
        handleCancel={toggleWoopModal}
        okText="Edit"
        details={woopModalDetails}
      />
      <Popper
        open={openWoopPopper}
        anchorEl={anchorWoop}
        placement="right-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Button onClick={toggleWoopModal}>Edit</Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
