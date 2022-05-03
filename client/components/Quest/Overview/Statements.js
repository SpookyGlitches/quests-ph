import {
  Box,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import useSWR, { useSWRConfig } from "swr";
import { useSnackbar } from "notistack";
import axios from "axios";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useContext, useEffect, useState } from "react";
import MemberStatement from "./MemberStatement";
import WoopModal from "../WoopModal";
import { QuestContext } from "../../../context/QuestContext";
import { PartyMemberContext } from "../../../context/PartyMemberContext";
import CustomCircularProgress from "../../Common/CustomSpinner";

const titleTypographyProps = {
  sx: {
    marginBottom: 1,
  },
  variant: "h6",
};

export default function Statements() {
  const [anchorWoop, setAnchorWoop] = useState(null);
  const [openWoopPopper, setOpenWoopPopper] = useState(false);

  const { questId, wish, completedAt } = useContext(QuestContext);
  const partyMember = useContext(PartyMemberContext);
  const { mutate } = useSWRConfig();
  const { data: partyMembers, mutate: mutatePartyMembers } = useSWR(
    questId ? `/quests/${questId}/partyMembers?excludeMentor=true` : null,
  );
  const { enqueueSnackbar } = useSnackbar();

  const [woopModalDetails, setWoopModalDetails] = useState({
    loading: false,
    title: "Edit Quest Overview",
    open: false,
    statement: {
      outcome: "",
      obstacle: "",
      plan: "",
      wish,
    },
  });

  useEffect(() => {
    if (!partyMember) return;
    setWoopModalDetails((prev) => ({
      ...prev,
      statement: {
        ...prev.statement,
        outcome: partyMember.outcome,
        obstacle: partyMember.obstacle,
        plan: partyMember.plan,
      },
    }));
  }, [partyMember]);

  const handleWoopPopperClick = (event) => {
    setAnchorWoop(event.currentTarget);
    setOpenWoopPopper(!openWoopPopper);
  };

  const updateUserStatement = async (values) => {
    const { data } = await axios.put(
      `/api/quests/${questId}/partyMembers/${partyMember.partyMemberId}`,
      values,
    );
    mutate(`/quests/${questId}/partyMembers/currentUser`, data);
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

  const closeWoopPopper = () => {
    setOpenWoopPopper(false);
  };

  const submitForm = async (values) => {
    try {
      await updateUserStatement(values);
      enqueueSnackbar("Successfully updated.");
      setWoopModalDetails((prev) => ({ ...prev, open: false, loading: false }));
      closeWoopPopper();
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

  if (!partyMembers) {
    return <CustomCircularProgress rootStyles={{ minHeight: 100 }} />;
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
          <Typography variant="h5" color="primary">
            Overview
          </Typography>
          {partyMember.role !== "MENTOR" && (
            <IconButton
              onClick={handleWoopPopperClick}
              disabled={Boolean(completedAt)}
            >
              <MoreHorizRoundedIcon />
            </IconButton>
          )}
        </Box>

        <Stack spacing={3} sx={{ marginTop: 2 }}>
          <div>
            <Typography {...titleTypographyProps}>Wish</Typography>
            <Typography variant="body1">{wish}</Typography>
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
