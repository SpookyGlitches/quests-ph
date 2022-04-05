import * as React from "react";
import { useEffect } from "react";
import useSWR from "swr";
import FriendOptionsBar from "./FriendOptionsBar";
import NotFriendOptionsBar from "./NotFriendOptionsBar";

export default function Options({ userId, role }) {
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
    userId ? `/profile/${userId}/friends` : null,
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

  if (friendships.length === 0) {
    return (
      <NotFriendOptionsBar
        userId={userId}
        friendInfo={friendInfo}
        role={role}
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
