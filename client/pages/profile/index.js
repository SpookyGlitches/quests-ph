import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import AppLayout from "../../components/Layouts/AppLayout";
import BadgesList from "../../components/Profile/BadgesList";
import BasicInfo from "../../components/Profile/BasicInfo";
import QuestChart from "../../components/Profile/QuestChart";

import AccessDenied from "../../components/Error/AccessDenied";
import QuestList from "../../components/Profile/QuestList";

export default function Profile() {
  const { data: session } = useSession();
  if (session) {
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
            <BasicInfo userId={session.user.userId} />
            <BadgesList userId={session.user.userId} />
            <QuestChart />
            <QuestList />
          </Box>
        </Box>
      </AppLayout>
    );
  }
  return <AccessDenied />;
}
