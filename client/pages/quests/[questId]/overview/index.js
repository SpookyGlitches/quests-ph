import { Box } from "@mui/material";
import AppLayout from "../../../../components/Layouts/AppLayout";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Settings from "../../../../components/Quest/Overview/Settings";
import Statements from "../../../../components/Quest/Overview/Statements";

export default function Overview() {
  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Statements />
      <Settings />
    </Box>
  );
}

Overview.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
