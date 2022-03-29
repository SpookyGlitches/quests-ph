import { Box } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import AppLayout from "../../../components/Layouts/AppLayout";
// import BadgesList from "../../../components/Profile/BadgesList";
import FriendsBasicInfo from "../../../components/Profile/Friends/FriendsBasicInfo";
// import QuestChart from "../../../components/Profile/QuestChart";
import OptionsBar from "../../../components/Profile/Friends/OptionsBar";
import AccessDenied from "../../../components/Error/AccessDenied";

export default function Profile() {
  const [role, setRole] = useState("");
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
        // console.log(res.data);
        setRole(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFriendInfo();
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
            <FriendsBasicInfo displayName={displayName} />
            <OptionsBar role={role} />
            {/* <BadgesList />
          <QuestChart />   */}
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
