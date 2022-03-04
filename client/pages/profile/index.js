import AppLayout from "../../components/Layouts/AppLayout";
import BadgesList from "../../components/Profile/BadgesList";
import BasicInfo from "../../components/Profile/BasicInfo";
import { Stack } from "@mui/material";
import QuestChart from "../../components/Profile/QuestChart";
export default function Profile() {
  return (
    <AppLayout>
      <Stack spacing={4} sx={{ width: "100%" }}>
        <BasicInfo />
        <BadgesList />
        <QuestChart />
      </Stack>
    </AppLayout>
  );
}
