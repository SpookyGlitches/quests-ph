import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, Grid, Stack } from "@mui/material";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Tasks/ToDo";
import PointsHistory from "../Quest/Tasks/PointsHistory";
import EndQuest from "../Quest/EndQuest";
import { QuestContext } from "../../context/QuestContext";
import { PartyMemberContext } from "../../context/PartyMemberContext";
import VideoCallRoom from "../Quest/VideoCallRoom";
import NotFound from "../Common/NotFound";
import CustomCircularProgress from "../Common/CustomSpinner";
import DocumentTitle from "../Common/DocumentTitle";
import MentorMessage from "../Quest/MentorMessage";

export default function QuestLayout({ children }) {
  const router = useRouter();

  const { questId } = router.query;

  const { data: questsName } = useSWR(`/quests/${router.query.questId}`);

  const { data: partyMember, error: partyMemberError } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );
  const { data: quest, error: questError } = useSWR(
    questId ? `/quests/${questId}` : null,
  );

  if (partyMemberError || questError) {
    return (
      <Box sx={{ height: "100%", width: "100%" }}>
        <NotFound />;
      </Box>
    );
  }

  if (!partyMember || !quest) {
    return <CustomCircularProgress rootStyles={{ minHeight: "50vh" }} />;
  }

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const renderEndQuest = () => {
    if (quest.completedAt) {
      return <EndQuest />;
    }

    if (partyMember.role === "PARTY_LEADER") {
      return <EndQuest />;
    }

    return null;
  };

  return (
    <Grid container spacing={6}>
      <DocumentTitle title={capitalize(`${questsName.wish}`)} />
      <QuestContext.Provider value={quest}>
        <PartyMemberContext.Provider value={partyMember}>
          <Grid item xs={12} lg={8}>
            <QuestHeader />
            <Box sx={{ marginTop: 4 }}>{children}</Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box sx={{}}>
              <Stack spacing={3}>
                <Todo />
                <PointsHistory />
                {partyMember.role === "PARTY_LEADER" && <VideoCallRoom />}
                {renderEndQuest()}
                <MentorMessage />
              </Stack>
            </Box>
          </Grid>
        </PartyMemberContext.Provider>
      </QuestContext.Provider>
    </Grid>
  );
}
