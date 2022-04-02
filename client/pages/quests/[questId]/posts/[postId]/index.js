import { useRouter } from "next/router";
import useSWR from "swr";
import QuestLayout from "../../../../../components/Layouts/QuestLayout";
import Post from "../../../../../components/Quest/Post/Post";
import AppLayout from "../../../../../components/Layouts/AppLayout";

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
      <Post post={post} />
    </div>
  );
};
export default PostPage;

PostPage.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
