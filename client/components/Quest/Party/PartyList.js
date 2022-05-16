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
import { useContext, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { PartyMemberContext } from "../../../context/PartyMemberContext";
import { QuestContext } from "../../../context/QuestContext";
import CustomCircularProgress from "../../Common/CustomSpinner";
import PopConfirm from "../../Common/PopConfirm";
import PartyListItem from "./PartyListItem";

export default function PartyList() {
  const router = useRouter();

  const quest = useContext(QuestContext);
  const partyMember = useContext(PartyMemberContext);
  const { mutate } = useSWRConfig();

  const [confirmModalState, setConfirmModalState] = useState({
    handleOk: () => {},
    title: "",
    subtitle: "",
    open: false,
  });

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
    const filtered = partyMembers.filter(
      (item) => item.partyMemberId !== partyMemberId,
    );
    mutatePartyMembers(filtered, { revalidate: false });

    try {
      await axios.delete(
        `/api/quests/${questId}/partyMembers/${partyMemberId}`,
      );

      // Removes the user from the group chat
      const talkJsRes = await axios.get(
        // eslint-disable-next-line
        `https://api.talkjs.com/v1/tvcbUw3n/users/${partyMemberData.userId}/conversations`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.TALKJS_KEY}`,
          },
        },
      );

      /* Flag variable to tell us if we found the convo in the list of the user's
      list of convos and stop the loop */
      let flag = 0;
      for (let i = 0; i < talkJsRes.data.data.length && flag === 0; i++) {
        if (talkJsRes.data.data[i].id === `${questId}QuestChat`) {
          flag = 1;
        }
      }

      /* If the flag is up, meaning the user is part of the quest's chat, he is removed
    from participating. */
      if (flag === 1) {
        await axios.delete(
          // eslint-disable-next-line
          `https://api.talkjs.com/v1/tvcbUw3n/conversations/${questId}QuestChat/participants/${partyMemberData.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${process.env.TALKJS_KEY}`,
            },
          },
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      mutatePartyMembers(filtered, { revalidate: true });
    }
  };

  const handleCancel = () => {
    setConfirmModalState((prev) => ({ ...prev, open: false }));
  };

  const banPartyMember = async (toBanUserId) => {
    const filteredMembers = partyMembers.filter(
      (item) => item.userId !== toBanUserId,
    );
    mutatePartyMembers(filteredMembers, { revalidate: false });

    try {
      await axios.post(`/api/quests/${questId}/partyBans`, {
        userId: toBanUserId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      mutate(`/quests/${questId}/partyBans`);
      mutatePartyMembers(filteredMembers, { revalidate: true });
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

  const openModalForKick = (partyMemberId) => {
    setConfirmModalState({
      open: true,
      title: "Are you sure you want to kick this user?",
      handleOk: () => removePartyMember(partyMemberId),
    });
  };

  const openModalForLeave = () => {
    setConfirmModalState({
      open: true,
      title: "Are you sure you want to leave?",
      subtitle:
        "You will lose everything associated in this Quest and all your task points. This action is irreversible. Proceed?",
      handleOk: leaveParty,
    });
  };

  const openModalForBan = (userId) => {
    setConfirmModalState({
      open: true,
      handleOk: () => banPartyMember(userId),
      title: "Are you sure you want to ban this user?",
    });
  };

  if (!partyMembers) {
    return <CustomCircularProgress rootStyles={{ minHeight: 100 }} />;
  }

  const mentees = [];
  const mentors = [];

  let x = 0;

  partyMembers.forEach((member) => {
    if (member.user.role === "mentor") {
      mentors.push(
        <PartyListItem
          item={member}
          rank="_"
          isPartyLeader={isPartyLeader}
          key={member.partyMemberId}
          removePartyMember={(partyMemberId) => openModalForKick(partyMemberId)}
          banPartyMember={(userId) => openModalForBan(userId)}
          completed={completed}
        />,
      );
    } else {
      mentees.push(
        <PartyListItem
          item={member}
          rank={x + 1}
          isPartyLeader={isPartyLeader}
          key={member.partyMemberId}
          mentor
          removePartyMember={(partyMemberId) => openModalForKick(partyMemberId)}
          banPartyMember={(userId) => openModalForBan(userId)}
          completed={completed}
        />,
      );
      x++;
    }
  });

  return (
    <>
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
                  {isPartyLeader && (
                    <TableCell align="center">Actions</TableCell>
                  )}
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
              <Button
                variant="outlined"
                color="primary"
                onClick={openModalForLeave}
              >
                Leave
              </Button>
            )}
          </Box>
        </Stack>
      </Paper>
      <PopConfirm
        open={confirmModalState.open}
        subtitle={confirmModalState.subtitle}
        title={confirmModalState.title}
        handleOk={confirmModalState.handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
