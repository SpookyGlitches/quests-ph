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
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MemberStatement from "./MemberStatement";
import WoopModal from "../WoopModal";

const titleTypographyProps = {
  sx: {
    marginBottom: "0.5rem",
  },
  variant: "h5",
  fontWeight: "medium",
};

export default function Statements() {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();
  const { data: quest } = useSWR(
    query?.questId ? `/quests/${router.query.questId}` : null,
  );
  const { data: partyMembers, mutate: mutateStatement } = useSWR(
    quest ? `/quests/${query.questId}/partyMembers?excludeMentor=true` : null,
  );
  const { data: filteredPartyMembers } = useSWR(
    quest && session?.userId && partyMembers
      ? `/quests/${query.questId}/partyMembers?excludeMentor=true&memberId=${session.userId}`
      : null,
  );

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
      wish: "",
    },
    partyMemberId: null,
  });

  useEffect(() => {
    if (filteredPartyMembers && filteredPartyMembers.length !== 0) {
      const member = filteredPartyMembers[0];
      const { outcome, obstacle, plan, partyMemberId } = member;
      setWoopModalDetails((prev) => ({
        ...prev,
        statement: {
          ...prev.statement,
          outcome,
          obstacle,
          plan,
        },
        partyMemberId,
      }));
    }
  }, [filteredPartyMembers]);

  useEffect(() => {
    if (!quest) return;
    setWoopModalDetails((prev) => ({
      ...prev,
      statement: {
        ...prev.statement,
        wish: quest.wish,
      },
    }));
  }, [quest]);

  const handleWoopPopperClick = (event) => {
    setAnchorWoop(event.currentTarget);
    setOpenWoopPopper(!openWoopPopper);
  };

  const editWoop = async (values) => {
    try {
      await axios.put(
        `/api/quests/${quest.questId}/partyMembers/${woopModalDetails.partyMemberId}`,
        values,
      );
      mutateStatement();
      setWoopModalDetails((prev) => ({ ...prev, open: false }));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWoopModal = () => {
    setWoopModalDetails((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };

  if (!quest || !partyMembers || !filteredPartyMembers) {
    return <div>Loading</div>;
  }

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
          {partyMembers.length}
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
