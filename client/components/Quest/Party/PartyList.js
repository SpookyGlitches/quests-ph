import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR, { mutate } from "swr";
import { PartyMemberContext } from "../../../context/PartyMemberContext";
import { QuestContext } from "../../../context/QuestContext";
import CustomCircularProgress from "../../Common/CustomSpinner";
import PartyListItem from "./PartyListItem";

export default function PartyList() {
  const router = useRouter();

  const quest = useContext(QuestContext);
  const partyMember = useContext(PartyMemberContext);
  const isPartyLeader = partyMember.role === "PARTY_LEADER";

  const { questId, completedAt } = quest;
  const completed = Boolean(completedAt);

  const { data: partyMembers, mutate: mutatePartyMembers } = useSWR(
    questId ? `/quests/${questId}/partyMembers?includePoints=true` : null,
  );

  const generateInviteLink = async () => {
    try {
      const { data } = await axios.get(
        `/api/quests/${questId}/partyMembers/invite`,
      );
      await navigator.clipboard.writeText(data);
      // eslint-disable-next-line no-alert
      alert("Successfully copied the invite link on your clipboard.");
    } catch (err) {
      console.error(err);
    }
  };

  const removePartyMember = async (partyMemberId) => {
    try {
      const filtered = partyMembers.filter(
        (item) => item.partyMemberId !== partyMemberId,
      );
      mutatePartyMembers(filtered, { revalidate: false });
      await axios.delete(
        `/api/quests/${questId}/partyMembers/${partyMemberId}`,
      );
      mutatePartyMembers(filtered, { revalidate: true });
    } catch (error) {
      console.error(error);
    }
  };

  const banPartyMember = async (toBanUserId) => {
    try {
      const filteredMembers = partyMembers.filter(
        (item) => item.userId !== toBanUserId,
      );
      mutatePartyMembers(filteredMembers, { revalidate: false });
      await axios.post(`/api/quests/${questId}/partyBans`, {
        userId: toBanUserId,
      });
      mutate(`/quests/${questId}/partyBans`);
      mutatePartyMembers(filteredMembers, { revalidate: true });
    } catch (error) {
      console.error(error);
    }
  };

  const leaveParty = async () => {
    try {
      await removePartyMember(partyMember.partyMemberId);
      mutate(`/quests/${questId}/partyMembers/currentUser`);
      router.push("/quests");
    } catch (err) {
      console.error(err);
    }
  };

  if (!partyMembers) {
    return <CustomCircularProgress rootStyles={{ minHeight: 100 }} />;
  }

  const mentees = [];
  const mentors = [];

  partyMembers.forEach((member, index) => {
    if (member.user.role === "mentor") {
      mentors.push(
        <PartyListItem
          item={member}
          rank="_"
          isPartyLeader={isPartyLeader}
          key={member.partyMemberId}
          removePartyMember={removePartyMember}
          banPartyMember={banPartyMember}
          completed={completed}
        />,
      );
    } else {
      mentees.push(
        <PartyListItem
          item={member}
          rank={index + 1}
          isPartyLeader={isPartyLeader}
          key={member.partyMemberId}
          mentor
          removePartyMember={removePartyMember}
          banPartyMember={banPartyMember}
          completed={completed}
        />,
      );
    }
  });

  return (
    <Paper sx={{ padding: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ color: "primary.main" }}>
          Party
        </Typography>
        <TableContainer>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="center">Points</TableCell>
                {isPartyLeader && <TableCell align="center">Actions</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {mentees}
              {mentors}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {isPartyLeader && (
            <Button
              variant="contained"
              color="primary"
              disabled={
                Boolean(completedAt) ||
                partyMembers.filter((member) => member.role !== "MENTOR")
                  .length >= 4
              }
              onClick={generateInviteLink}
            >
              Invite
            </Button>
          )}
          {!isPartyLeader && (
            <Button variant="outlined" color="primary" onClick={leaveParty}>
              Leave
            </Button>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
