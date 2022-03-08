import { Box } from "@mui/material";
import AppLayout from "../../components/Layouts/AppLayout";
import BadgesList from "../../components/Profile/BadgesList";
import BasicInfo from "../../components/Profile/BasicInfo";
import QuestChart from "../../components/Profile/QuestChart";

export default function Profile() {
  return (
    <AppLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "center", lg: "flex-start" },
          marginTop: "1rem",
          marginBottom: "2.5rem",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { sm: "100%", md: "80%", lg: "75%" },
            flexDirection: "column",
            gap: 2,
          }}
        >
          <BasicInfo />
          <BadgesList />
          <QuestChart />
        </Box>
      </Box>
    </AppLayout>
  );
}
