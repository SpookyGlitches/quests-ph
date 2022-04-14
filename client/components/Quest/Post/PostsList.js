import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import useSWR from "swr";
import Post from "./Post";
import LoadMore from "../../Common/LoadMore";

function PostPage(props) {
  const { url, take, skip, search, setHasMore, setLoading } = props;
  const withSearch = search ? `&search=${search}` : "";
  const isValidUrl = url && take && skip >= 0;
  const { data: posts } = useSWR(
    isValidUrl ? `${url}?take=${take}&skip=${skip}${withSearch}` : null,
  );

  if (!posts) {
    setLoading(true);
    return <div>Loading</div>;
  }

  if (posts.length < take) {
    setHasMore(false);
  }

  setLoading(false);

  return posts.map(({ postId, partyMember }) => {
    return <Post key={postId} postId={postId} questId={partyMember.questId} />;
  });
}

const PostsList = ({ url, take, search }) => {
  const [count, setCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const searchText = search && search.length ? search : undefined;
  const postPages = [];

  for (let i = 0; i < count; i++) {
    postPages.push(
      <PostPage
        url={url}
        take={take}
        search={searchText}
        setHasMore={setHasMore}
        skip={i}
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
  }, [search, url]);

  return (
    <>
      <Stack spacing={4}>{postPages}</Stack>
      <LoadMore hasMore={hasMore} loading={loading} onClick={loadMore} />
    </>
  );
};

export default PostsList;
