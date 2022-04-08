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
  const { questId } = router.query;
  const { data: quest } = useSWR(questId ? `/quests/${questId}` : null);
  const { data: partyMembers, mutate: mutatePartyMembers } = useSWR(
    quest ? `/quests/${questId}/partyMembers?excludeMentor=true` : null,
  );
  const { data: partyMember, mutate: mutateStatement } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
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
    partyMemberId: partyMember?.partyMemberId,
  });

  useEffect(() => {
    if (!quest || !partyMember) return;
    setWoopModalDetails((prev) => ({
      ...prev,
      statement: {
        outcome: partyMember.outcome,
        obstacle: partyMember.obstacle,
        plan: partyMember.plan,
        wish: quest.wish,
      },
    }));
  }, [quest, partyMember]);

  const handleWoopPopperClick = (event) => {
    setAnchorWoop(event.currentTarget);
    setOpenWoopPopper(!openWoopPopper);
  };

  const updateUserStatement = async (values) => {
    const { data } = await axios.put(
      `/api/quests/${quest.questId}/partyMembers/${partyMember.partyMemberId}`,
      values,
    );
    return data;
  };

  const submitForm = async (values) => {
    try {
      mutateStatement(await updateUserStatement(values), {
        revalidate: false,
      });
      mutatePartyMembers();
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

  if (!quest || !partyMembers || !partyMember) {
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
              name={item.user.displayName}
              key={item.partyMemberId}
            />
          ))}
        </div>
        <div>
          <Typography {...titleTypographyProps}>🗻 Obstacle</Typography>
          {partyMembers.map((item) => (
            <MemberStatement
              text={item.obstacle}
              name={item.user.displayName}
              key={item.partyMemberId}
            />
          ))}
        </div>
        <div>
          <Typography {...titleTypographyProps}>📒 Plan</Typography>
          {partyMembers.map((item) => (
            <MemberStatement
              text={item.plan}
              name={item.user.displayName}
              key={item.partyMemberId}
            />
          ))}
        </div>
      </Stack>
      <WoopModal
        handleOk={submitForm}
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
