import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Stack } from "@mui/material";
import AppLayout from "./AppLayout";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Tasks/ToDo";
import EndQuest from "../Quest/EndQuest";
import { QuestContext } from "../../context/QuestContext";

export default function QuestLayout({ children }) {
  const [quest, setQuest] = useState({});
  const router = useRouter();

  const fetchQuest = async () => {
    try {
      const { data } = await axios.get(`/api/quests/${router.query.questId}`);
      if (data && data.quest) setQuest(data.quest);
      else throw new Error();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchQuest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <AppLayout>
      <QuestContext.Provider value={quest}>
        <Grid container sx={{ paddingTop: "1rem" }} spacing={6}>
          <Grid item xs={12} lg={8}>
            <QuestHeader />
            <Box sx={{ marginTop: "2rem" }}>{children}</Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box sx={{}}>
              <Stack spacing={4}>
                <Todo />
                <EndQuest />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </QuestContext.Provider>
    </AppLayout>
  );
}
