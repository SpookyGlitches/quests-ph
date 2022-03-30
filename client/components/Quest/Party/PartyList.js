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
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";

export default function PartyList() {
  const router = useRouter();
  const { questId } = router.query;
  const session = useSession();
  const userId = session?.data?.user?.userId;
  const { data: partyMembers, mutate: mutatePartyMembers } = useSWR(
    questId ? `/quests/${questId}/partyMembers` : null,
  );
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

  if (!partyMembers) {
    return <div>loading</div>;
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

  return (
    <Box
      sx={{
        p: 1,
        m: 3,
      }}
    >
      <Typography variant="h4" sx={{ color: "primary.main" }}>
        Party
      </Typography>
      <Stack spacing={3}>
        <TableContainer sx={{}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="center">Points</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {partyMembers.map((item, index) => (
                <TableRow
                  key={item.partyMemberId}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                      }}
                    >
                      {item.user.displayName[0]}
                    </Avatar>
                    <Typography variant="body2">
                      {item.user.displayName}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">{0}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => removePartyMember(item.partyMemberId)}
                    >
                      <PersonRemoveAlt1RoundedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => banPartyMember(item.user.userId)}
                    >
                      <BlockRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box>
          <Button
            variant="outlined"
            color="primary"
            style={
              {
                // maxWidth: "80px",
                // minWidth: "80px",
                // backgroundColor: "#E8E8E8",
                // borderColor: "#E8E8E8",
                // color: "#B0B0B0",
              }
            }
            onClick={leaveParty}
          >
            Leave
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right", maxWidth: "80px", minWidth: "80px" }}
            onClick={generateInviteLink}
          >
            Invite
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
