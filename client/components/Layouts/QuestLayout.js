import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, Grid, Stack } from "@mui/material";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Tasks/ToDo";
import EndQuest from "../Quest/EndQuest";
import DateCard from "../Quest/Tasks/DateCard";
import Suggestions from "../Common/Suggestions";

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
    <Grid container sx={{ paddingTop: "1rem" }} spacing={6}>
      <Grid item xs={12} lg={8}>
        <QuestHeader />
        <Box sx={{ marginTop: "2rem" }}>{children}</Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{}}>
          <Stack spacing={4}>
            <DateCard />
            <Todo />
            <Suggestions />
            <EndQuest />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
