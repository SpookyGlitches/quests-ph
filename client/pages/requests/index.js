import { useSession } from "next-auth/react";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import AppLayout from "../../components/Layouts/AppLayout";
import AccessDenied from "../../components/Error/AccessDenied";
import IncomingRequests from "../../components/Requests/Incoming";
import ReapplyMentor from "../../components/Requests/ApplyAgain";

function ListHolder({ items, requestName = "Mentor Requests" }) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: "1rem",
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      <Typography color="primary" variant="h4">
        {requestName}
      </Typography>
      {/* eslint-disable-next-line  */}
      {items.map((item) => {
        return (
          <IncomingRequests key={item.questMentorshipRequestId} item={item} />
        );
      })}
    </Box>
  );
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = () => {
  const { data: session } = useSession();
  const { data: mentorrequests } = useSWR(
    "/api/requests/mentorrequests",
    fetcher,
  );
  if (!mentorrequests)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  if (session) {
    return (
      <AppLayout>
        <ReapplyMentor userId={session.user.userId} />
        <ListHolder items={mentorrequests} />
      </AppLayout>
    );
  }
  return <AccessDenied />;
};

export default Index;
