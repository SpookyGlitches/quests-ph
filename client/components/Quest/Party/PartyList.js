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
import useSWR, { useSWRConfig } from "swr";
import PartyListItem from "./PartyListItem";

export default function PartyList() {
  const router = useRouter();
  const { questId } = router.query;
  const { data: partyMembers, mutate: mutatePartyMembers } = useSWR(
    questId ? `/quests/${questId}/partyMembers?includePoints=true` : null,
  );
  const { data: partyMember } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );
  const { data: quest } = useSWR(questId ? `/quests/${questId}` : null);

  const { mutate } = useSWRConfig();

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

  if (!partyMembers || !quest || !partyMember) {
    return <div>Loading</div>;
  }

  const removePartyMember = async (partyMemberId) => {
    try {
      await axios.delete(
        `/api/quests/${questId}/partyMembers/${partyMemberId}`,
      );
      const filtered = partyMembers.filter(
        (item) => item.partyMemberId !== partyMemberId,
      );
      mutatePartyMembers(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  const banPartyMember = async (toBanUserId) => {
    try {
      await axios.post(`/api/quests/${questId}/partyBans`, {
        userId: toBanUserId,
      });
      const filteredMembers = partyMembers.filter(
        (item) => item.userId !== toBanUserId,
      );
      mutatePartyMembers(filteredMembers);
      mutate(`/quests/${questId}/partyBans`);
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

  const isPartyLeader = partyMember.role === "PARTY_LEADER";

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
        />,
      );
    }
  });

  return (
    <Paper sx={{ padding: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ color: "primary.main" }}>
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
