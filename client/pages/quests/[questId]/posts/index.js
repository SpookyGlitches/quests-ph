import { useRouter } from "next/router";
import useSWR from "swr";
import PostsList from "../../../../components/Quest/Post/PostsList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";
import CreatePost from "../../../../components/Quest/Post/CreatePost";

const Index = () => {
  const router = useRouter();
  const { questId } = router.query;
  const { data: posts } = useSWR(questId ? `/quests/${questId}/posts` : null);

  if (!posts) {
    return <div>Loading</div>;
  }

  const onCreatePostClick = () => {
    router.push(`/quests/${questId}/posts/create`);
  };

  return (
    <div>
      <CreatePost onCreatePostClick={onCreatePostClick} />
      <PostsList posts={posts} />
    </div>
  );
};
export default Index;

Index.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
