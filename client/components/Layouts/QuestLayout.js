import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, Grid, Stack } from "@mui/material";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Tasks/ToDo";
import EndQuest from "../Quest/EndQuest";
import DateCard from "../Quest/Tasks/DateCard";
import Suggestions from "../Common/Suggestions";
import VideoCallRoom from "../Quest/VideoCallRoom";

export default function QuestLayout({ children }) {
  const router = useRouter();

  const { questId } = router.query;
  const { data: partyMember, error } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );

  if (error) {
    return <div>Something went wrong.</div>;
  }

  if (!partyMember) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <QuestHeader />
        <Box sx={{ marginTop: 4 }}>{children}</Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{}}>
          <Stack spacing={3}>
            <DateCard />
            <Todo />
            <Suggestions />
            {partyMember.role === "PARTY_LEADER" && <VideoCallRoom />}
            {partyMember.role === "PARTY_LEADER" && <EndQuest />}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
