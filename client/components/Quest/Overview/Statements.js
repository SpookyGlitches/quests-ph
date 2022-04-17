import {
  Box,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
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
    marginBottom: 1,
  },
  variant: "h6",
};

export default function Statements() {
  const { query } = useRouter();
  const { questId } = query;

  const [anchorWoop, setAnchorWoop] = useState(null);
  const [openWoopPopper, setOpenWoopPopper] = useState(false);

  const { data: quest } = useSWR(questId ? `/quests/${questId}` : null);
  const { data: partyMembers, mutate: mutatePartyMembers } = useSWR(
    questId ? `/quests/${questId}/partyMembers?excludeMentor=true` : null,
  );
  const { data: partyMember, mutate: mutateStatement } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );

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
    mutateStatement(data);

    mutatePartyMembers((questPartyMembers) => {
      const partyMemberIndex = questPartyMembers.findIndex((x) => {
        return x.partyMemberId === partyMember.partyMemberId;
      });

      const copiedPartyMembers = [...partyMembers];

      if (partyMemberIndex >= 0) {
        copiedPartyMembers[partyMemberIndex] = {
          ...copiedPartyMembers[partyMemberIndex],
          ...data,
        };
      }

      return copiedPartyMembers;
    });
  };

  const submitForm = async (values) => {
    try {
      await updateUserStatement(values);
      setWoopModalDetails((prev) => ({ ...prev, open: false, loading: false }));
    } catch (error) {
      setWoopModalDetails((prev) => ({ ...prev, loading: false }));
      console.error(error);
    }
  };

  const toggleWoopModal = () => {
    setWoopModalDetails((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };

  const closeWoopPopper = () => {
    setOpenWoopPopper(false);
  };

  if (!quest || !partyMembers || !partyMember) {
    return <div>Loading</div>;
  }
  const outcomes = [];
  const obstacles = [];
  const plans = [];

  partyMembers.forEach((member) => {
    outcomes.push(
      <MemberStatement
        text={member.outcome}
        user={member.user}
        key={member.partyMemberId}
      />,
    );
    obstacles.push(
      <MemberStatement
        text={member.obstacle}
        user={member.user}
        key={member.partyMemberId}
      />,
    );
    plans.push(
      <MemberStatement
        text={member.plan}
        user={member.user}
        key={member.partyMemberId}
      />,
    );
  });

  return (
    <>
      <Paper
        sx={{
          padding: 3,
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
          {partyMember.role !== "MENTOR" && (
            <IconButton onClick={handleWoopPopperClick}>
              <MoreHorizRoundedIcon />
            </IconButton>
          )}
        </Box>

        <Stack spacing={3} sx={{ marginTop: 2 }}>
          <div>
            <Typography {...titleTypographyProps}>Wish</Typography>
            <Typography variant="body1">{quest.wish}</Typography>
          </div>
          <div>
            <Typography {...titleTypographyProps}>Outcome</Typography>
            {outcomes}
          </div>
          <div>
            <Typography {...titleTypographyProps}>Obstacle</Typography>
            {obstacles}
          </div>
          <div>
            <Typography {...titleTypographyProps}>Plan</Typography>
            {plans}
          </div>
        </Stack>
        <WoopModal
          handleOk={submitForm}
          handleCancel={toggleWoopModal}
          okText="Edit"
          details={woopModalDetails}
        />
      </Paper>
      <Menu
        dense
        open={openWoopPopper}
        anchorEl={anchorWoop}
        onClose={closeWoopPopper}
        transition
      >
        <MenuItem dense onClick={toggleWoopModal} color="primary">
          Edit
        </MenuItem>
      </Menu>
    </>
  );
}
