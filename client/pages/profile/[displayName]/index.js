import { Box } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import AppLayout from "../../../components/Layouts/AppLayout";
import FriendBadgesList from "../../../components/Profile/Friends/FriendsBadgesList";
import FriendsBasicInfo from "../../../components/Profile/Friends/FriendsBasicInfo";
import FriendsQuestChart from "../../../components/Profile/Friends/FriendsQuestChart";
import OptionsBar from "../../../components/Profile/Friends/OptionsBar";
import AccessDenied from "../../../components/Error/AccessDenied";

export default function Profile() {
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const { displayName } = router.query;
  const getFriendInfo = () => {
    axios
      .get("/api/profile/friends/friendinfo", {
        params: {
          displayName,
        },
      })
      .then((res) => {
        setRole(res.data.role);
        setFullName(res.data.fullName);
        setUserId(res.data.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFriendInfo();
    // eslint-disable-next-line
  }, []);
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
            <FriendsBasicInfo displayName={displayName} fullName={fullName} />
            <OptionsBar role={role} />
            <FriendBadgesList userId={userId} />
            <FriendsQuestChart userId={userId} />
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
