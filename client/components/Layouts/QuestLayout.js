import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, Grid, Stack } from "@mui/material";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Tasks/ToDo";
import EndQuest from "../Quest/EndQuest";
import DateCard from "../Quest/Tasks/DateCard";
<<<<<<< HEAD

import VideoCallRoom from "../Quest/VideoCallRoom";
=======
import Suggestions from "../Common/Suggestions";
import { QuestContext } from "../../context/QuestContext";
import { PartyMemberContext } from "../../context/PartyMemberContext";
>>>>>>> 945ede3705f02cbe8af7d19079355b0aa339ec8c

export default function QuestLayout({ children }) {
  const router = useRouter();

  const { questId } = router.query;

  const { data: partyMember, error: partyMemberError } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );
  const { data: quest, error: questError } = useSWR(
    questId ? `/quests/${questId}` : null,
  );

  if (partyMemberError || questError) {
    return <div>Something went wrong.</div>;
  }

  if (!partyMember || !quest) {
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
            {partyMember.role === "PARTY_LEADER" && <VideoCallRoom />}
            {partyMember.role === "PARTY_LEADER" && <EndQuest />}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
