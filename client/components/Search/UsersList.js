import useSWR from "swr";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import LoadMore from "../Common/LoadMore";
import User from "./User";

function UserPage({ url, setHasMore, searchParams, setLoading, skip }) {
  const queryString = new URLSearchParams({ ...searchParams, skip }).toString();
  const { data: users } = useSWR(url ? `${url}?${queryString}` : null);

  if (!users) {
    setLoading(true);
    return <div>Loading</div>;
  }

  if (users.length < searchParams.take) {
    setHasMore(false);
  }
  setLoading(false);

  return users.map((user) => {
    return <User user={user} key={user.userId} />;
  });
}

export default function UsersList({ url, searchParams }) {
  const [count, setCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const userPages = [];
  for (let i = 0; i < count; i++) {
    userPages.push(
      <UserPage
        url={url}
        setHasMore={setHasMore}
        skip={i}
        searchParams={searchParams}
        key={i}
        setLoading={setLoading}
      />,
    );
  }

  const loadMore = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    setHasMore(true);
    setCount(1);
  }, [searchParams]);

  return (
    <>
      <Stack spacing={3}>{userPages}</Stack>
      <LoadMore hasMore={hasMore} loading={loading} onClick={loadMore} />
    </>
  );
}
