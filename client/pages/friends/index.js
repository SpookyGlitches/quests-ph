import CircularProgress from "@mui/material/CircularProgress";
import useSWR from "swr";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import AppLayout from "../../components/Layouts/AppLayout";
import SearchBar from "../../components/Friends/Search";
import FilterHolder from "../../components/Friends/FilterHolder";
import Friends from "../../components/Friends/Friends";
import Incoming from "../../components/Friends/Incoming";
import Outgoing from "../../components/Friends/Outgoing";
import AccessDenied from "../../components/Error/AccessDenied";

function ListHolder({ items, requestName }) {
  const { data: session } = useSession();
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
      {/* eslint-disable-next-line */}
      {items.map((item) => {
        switch (requestName) {
          case "Incoming Requests":
            return <Incoming key={item.friendRequestId} item={item} />;
          case "Outgoing Requests":
            return <Outgoing key={item.friendRequestId} item={item} />;
          case "Friends":
            return (
              <Friends
                key={item.friendshipId}
                item={item}
                displayName={session.user.displayName}
              />
            );
          default:
            return <h4>Friends</h4>;
        }
      })}
    </Box>
  );
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = () => {
  const { data: session } = useSession();
  if (session) {
    // eslint-disable-next-line
    const { data: friends, error: one } = useSWR(
      "/api/friends/friends",
      fetcher,
    );
    // eslint-disable-next-line
    const { data: incoming, error: two } = useSWR(
      "/api/friends/incoming",
      fetcher,
    );
    // eslint-disable-next-line
    const { data: outgoing, error: three } = useSWR(
      "/api/friends/outgoing",
      fetcher,
    );

    // Progress bar lng sa cause Im not sure how to handle this.
    if (!friends || one)
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
    if (!incoming || two)
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
    if (!outgoing || three)
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

    return (
      <AppLayout>
        <div>
          <SearchBar />

          <FilterHolder />

          <ListHolder items={incoming} requestName="Incoming Requests" />

          <ListHolder items={outgoing} requestName="Outgoing Requests" />

          <ListHolder
            items={friends}
            requestName="Friends"
            fullName={session.user.displayName}
          />
        </div>
      </AppLayout>
    );
  }
  return <AccessDenied />;
};
export default Index;

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
