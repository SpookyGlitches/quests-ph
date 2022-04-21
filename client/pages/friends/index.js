import CircularProgress from "@mui/material/CircularProgress";
import useSWR from "swr";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { getSession } from "next-auth/react";
import AppLayout from "../../components/Layouts/AppLayout";
import Friends from "../../components/Friends/Friends";
import Incoming from "../../components/Friends/Incoming";
import Outgoing from "../../components/Friends/Outgoing";
import AccessDenied from "../../components/Error/AccessDenied";
import prisma from "../../lib/prisma";

function ListHolder({ items, requestName, displayName }) {
  if (items.length !== 0) {
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
                  displayName={displayName}
                />
              );
            default:
              return <h4>Friends</h4>;
          }
        })}
      </Box>
    );
  }
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
      <Box sx={{ my: 3 }} align="center">
        <Typography variant="h5" align="center">
          No items found.
        </Typography>
      </Box>
    </Box>
  );
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index = ({ name }) => {
  if (name != null) {
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
        />
      );
    if (!outgoing || three)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      );

    return (
      <AppLayout>
        <div>
          <ListHolder items={incoming} requestName="Incoming Requests" />

          <ListHolder items={outgoing} requestName="Outgoing Requests" />

          <ListHolder
            items={friends}
            requestName="Friends"
            displayName={name}
          />
        </div>
      </AppLayout>
    );
  }

  return <AccessDenied />;
};
export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let name;
  if (session) {
    const findUser = await prisma.user.findFirst({
      where: {
        userId: session.user.userId,
        deletedAt: null,
      },
    });
    name = findUser.displayName;
    return {
      props: {
        name: JSON.parse(JSON.stringify(name)),
      },
    };
  }
  return {
    props: {
      name: null,
    },
  };
}
