import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, Grid } from "@mui/material";
import PartyList from "../../../../components/Quest/Party/PartyList";
import BanList from "../../../../components/Quest/Party/BanList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";

export default function PartyPage() {
  const router = useRouter();

  const { questId } = router.query;
  const { data: partyMember } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );
  return (
    <Grid
      container
      sx={{ paddingTop: "1.2rem" }}
      columnSpacing={8}
      rowSpacing={4}
    >
      <Grid item xs={12} lg={12}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            height: "auto",
            padding: "0.5rem",
          }}
        >
          <PartyList />
        </Box>
        {partyMember && partyMember.role === "PARTY_LEADER" && (
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              height: "auto",
              padding: "0.5rem",
              marginTop: "2em",
            }}
          >
            <BanList />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

PartyPage.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
