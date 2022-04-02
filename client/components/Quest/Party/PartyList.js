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
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import PartyListItem from "./PartyListItem";

export default function PartyList() {
  const router = useRouter();
  const { questId } = router.query;
  const session = useSession();
  const userId = session?.data?.user?.userId;
  const { data: partyMembers, mutate: mutatePartyMembers } = useSWR(
    questId ? `/quests/${questId}/partyMembers?includePoints=true` : null,
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
      alert("Successfully copied on your clipboard.");
    } catch (err) {
      console.error(err);
    }
  };

  if (!partyMembers || !quest) {
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
      const member = partyMembers.find((item) => item.userId === userId);
      await removePartyMember(member.partyMemberId);
      router.push("/quests");
    } catch (err) {
      console.error(err);
    }
  };

  const isPartyLeader = (userIdToCheck) => {
    return quest.userId === userIdToCheck;
  };

  const renderMentor = () => {
    const mentor = partyMembers.find((member) => member.role === "MENTOR");
    if (!mentor) return null;
    return (
      <PartyListItem
        item={mentor}
        rank="_"
        isPartyLeader={isPartyLeader}
        removePartyMember={removePartyMember}
        banPartyMember={banPartyMember}
        userId={userId}
      />
    );
  };

  return (
    <Box
      sx={{
        p: 1,
        m: 3,
      }}
    >
      <Typography variant="h4" sx={{ color: "primary.main", mb: 2 }}>
        Party
      </Typography>
      <Stack spacing={3}>
        <TableContainer sx={{}}>
          <Table aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="center">Points</TableCell>
                {isPartyLeader(userId) && (
                  <TableCell align="center">Actions</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {partyMembers
                .filter((item) => item.role !== "MENTOR")
                .map((item, index) => (
                  <PartyListItem
                    item={item}
                    rank={index + 1}
                    key={item.partyMemberId}
                    isPartyLeader={isPartyLeader}
                    removePartyMember={removePartyMember}
                    banPartyMember={banPartyMember}
                    userId={userId}
                  />
                ))}
              {renderMentor()}
            </TableBody>
          </Table>
        </TableContainer>

        <Box>
          {!isPartyLeader(userId) && (
            <Button variant="outlined" color="primary" onClick={leaveParty}>
              Leave
            </Button>
          )}
          {isPartyLeader(userId) && (
            <Button
              variant="contained"
              color="primary"
              style={{ float: "right", maxWidth: "80px", minWidth: "80px" }}
              onClick={generateInviteLink}
            >
              Invite
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
