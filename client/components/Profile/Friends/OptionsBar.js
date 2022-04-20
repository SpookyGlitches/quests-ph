import * as React from "react";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import FriendOptionsBar from "./FriendOptionsBar";
import NotFriendOptionsBar from "./NotFriendOptionsBar";

export default function Options({ userId, role }) {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const [friendInfo, setFriendInfo] = React.useState("");
  // eslint-disable-next-line
  const { data: friendInfos } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );
  // eslint-disable-next-line
  useEffect(() => {
    if (!friendInfos) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      );
    }
    setFriendInfo(friendInfos);
  }, [friendInfos]);

  const { data: friendships } = useSWR(
    userId ? `/api/profile/${userId}/friends` : null,
    fetcher,
  );
  const { data: friendRequests } = useSWR(
    userId ? `/api/profile/${userId}/checkrequest` : null,
    fetcher,
  );

  if (!friendships) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      />
    );
  }
  if (!friendRequests) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      />
    );
  }

  if (friendships.length === 0) {
    return (
      <NotFriendOptionsBar
        userId={userId}
        friendInfo={friendInfo}
        role={role}
        requests={friendRequests}
      />
    );
  }

  return (
    <FriendOptionsBar
      userId={userId}
      friendshipId={friendships[0].friendshipId}
      friendInfo={friendInfo}
      role={role}
    />
  );
}
