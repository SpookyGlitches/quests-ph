import { useRouter } from "next/router";
import PostsList from "../../../../components/Quest/Post/PostsList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";
import CreatePost from "../../../../components/Quest/Post/CreatePost";

export default function PostsPage() {
  const router = useRouter();
  const { questId } = router.query;
  const url = questId ? `/quests/${questId}/posts` : null;

  const onCreatePostClick = () => {
    router.push(`/quests/${questId}/posts/create`);
  };

  return (
    <div>
      <CreatePost
        onCreatePostClick={onCreatePostClick}
        rootStyles={{ marginBottom: 3 }}
      />
      <PostsList url={url} searchParams={{ take: 5 }} />
    </div>
  );
}

PostsPage.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
