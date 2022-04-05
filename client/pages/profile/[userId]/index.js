import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import AppLayout from "../../../components/Layouts/AppLayout";
import FriendBadgesList from "../../../components/Profile/Friends/FriendsBadgesList";
import FriendsBasicInfo from "../../../components/Profile/Friends/FriendsBasicInfo";
import FriendsQuestChart from "../../../components/Profile/Friends/FriendsQuestChart";
import OptionsBar from "../../../components/Profile/Friends/OptionsBar";
import FriendsQuestList from "../../../components/Profile/Friends/FriendsQuestsList";
import AccessDenied from "../../../components/Error/AccessDenied";

export default function FriendsProfile() {
  const router = useRouter();
  const { userId } = router.query;

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
            <FriendsBasicInfo userId={userId} />
            {userId !== session.user.userId ? (
              <OptionsBar userId={userId} role={session.user.role} />
            ) : (
              // eslint-disable-next-line
              <></>
            )}
            <FriendBadgesList userId={userId} />
            <FriendsQuestChart userId={userId} />
            <FriendsQuestList userId={userId} />
          </Box>
        </Box>
      </AppLayout>
    );
  }
  return <AccessDenied />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
