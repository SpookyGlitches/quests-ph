import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import useSWR from "swr";
import Post from "./Post";
import LoadMore from "../../Common/LoadMore";

function PostPage(props) {
  const { url, skip, setHasMore, setLoading, searchParams } = props;
  const queryString = new URLSearchParams({ ...searchParams, skip }).toString();
  const { data: posts } = useSWR(url ? `${url}?${queryString}` : null);

  if (!posts) {
    setLoading(true);
    return null;
  }

  if (posts.length < searchParams.take) {
    setHasMore(false);
  }

  setLoading(false);

  return posts.map(({ postId, partyMember }) => {
    return <Post key={postId} postId={postId} questId={partyMember.questId} />;
  });
}

const PostsList = ({ url, searchParams }) => {
  const [count, setCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const postPages = [];

  for (let i = 0; i < count; i++) {
    postPages.push(
      <PostPage
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
      <Stack spacing={4}>{postPages}</Stack>
      <LoadMore hasMore={hasMore} loading={loading} onClick={loadMore} />
    </>
  );
};

export default PostsList;
