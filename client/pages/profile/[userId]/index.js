import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import useSWR from "swr";
import AppLayout from "../../../components/Layouts/AppLayout";
import FriendBadgesList from "../../../components/Profile/Friends/FriendsBadgesList";
import FriendsBasicInfo from "../../../components/Profile/Friends/FriendsBasicInfo";
import FriendsQuestChart from "../../../components/Profile/Friends/FriendsQuestChart";
import OptionsBar from "../../../components/Profile/Friends/OptionsBar";
import FriendsQuestList from "../../../components/Profile/Friends/FriendsQuestsList";
import AccessDenied from "../../../components/Error/AccessDenied";
import prisma from "../../../lib/prisma";
import DocumentTitle from "../../../components/Common/DocumentTitle";

export default function FriendsProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const { userId } = router.query;

  const { data: pName } = useSWR(`/profile/${userId}`);

  if (session) {
    return (
      <AppLayout>
        <DocumentTitle title={`${pName?.displayName || " "}`} />
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
            <OptionsBar userId={userId} role={session.user.role} />
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
export async function getServerSideProps({ req, params }) {
  const { userId } = params;
  const session = await getSession({ req });
  if (session) {
    if (session.user.userId === userId) {
      return {
        redirect: {
          permanent: false,
          destination: "/profile",
        },
      };
    }
  }
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
