import { useRouter } from "next/router";
import useSWR from "swr";
import QuestLayout from "../../../../../components/Layouts/QuestLayout";
import Post from "../../../../../components/Quest/Post/Post";

const PostPage = () => {
  const {
    query: { questId, postId },
  } = useRouter();

  const { data: post } = useSWR(
    questId && postId ? `/quests/${questId}/posts/${postId}` : null,
  );

  if (!post) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Post post={post}>HELLO here</Post>
      {/*         
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          paddingX: 3,
          paddingY: 2,
          paddingLeft: 2,
          marginBottom: 3,
          gap: 2,
        }}
      >
        <Box sx={{}}>
          <Avatar sx={{}}>X</Avatar>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "background.default",
            height: 50,
            borderRadius: 1,
            paddingX: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "grey.700" }}>
            <Link href={`/quests/${questId}/posts/create`}>Create a Post</Link>
          </Typography>
        </Box>
      </Box> */}
      {/* <PostsList posts={posts} /> */}
    </div>
  );
};
export default PostPage;

PostPage.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
