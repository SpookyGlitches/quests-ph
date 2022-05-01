import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import useSWR from "swr";
import Post from "./Post";
import LoadMore from "../../Common/LoadMore";
import CustomCircularProgress from "../../Common/CustomSpinner";

function PostPage(props) {
  const { url, skip, setHasMore, setLoading, searchParams } = props;
  const queryString = new URLSearchParams({ ...searchParams, skip }).toString();
  const { data: posts, isValidating } = useSWR(
    url ? `${url}?${queryString}` : null,
  );

  useEffect(() => {
    setLoading(isValidating);

    if (!posts) {
      return;
    }

    const hasMore = posts.length >= searchParams.take;
    setHasMore(hasMore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, isValidating]);

  if (!posts) {
    return <CustomCircularProgress />;
  }

  return posts.map(({ postId, partyMember }) => {
    return <Post key={postId} postId={postId} questId={partyMember.questId} />;
  });
}

const PostsList = ({ url, searchParams }) => {
  const [count, setCount] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <Stack spacing={4}>{postPages}</Stack>
      <LoadMore hasMore={hasMore} loading={loading} onClick={loadMore} />
    </>
  );
};

export default PostsList;
