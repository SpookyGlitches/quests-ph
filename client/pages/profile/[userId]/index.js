import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AppLayout from "../../../components/Layouts/AppLayout";
import FriendBadgesList from "../../../components/Profile/Friends/FriendsBadgesList";
import FriendsBasicInfo from "../../../components/Profile/Friends/FriendsBasicInfo";
import FriendsQuestChart from "../../../components/Profile/Friends/FriendsQuestChart";
import OptionsBar from "../../../components/Profile/Friends/OptionsBar";
import FriendsQuestList from "../../../components/Profile/Friends/FriendsQuestsList";
import AccessDenied from "../../../components/Error/AccessDenied";
import prisma from "../../../lib/prisma";

export default function FriendsProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { userId } = router.query;

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
export async function getServerSideProps({ params }) {
  const { userId } = params;
  const findEmail = await prisma.user.findFirst({
    where: {
      userId,
      deletedAt: null,
    },
  });

  if (findEmail === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/noData",
      },
    };
  }

  return { props: { message: `Success` } };
}
