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
          justifyContent: "center",
          alignItem: "center",
          marginTop: "1rem",
          marginBottom: "2.5rem",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 5,
          width: "90%",
        }}
      >
        <BasicInfo />
        <BadgesList />
        <QuestChart />
      </Box>
    </AppLayout>
  );
}
