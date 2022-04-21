import { useRouter } from "next/router";
import { useContext } from "react";
import PostsList from "../../../../components/Quest/Post/PostsList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";
import CreatePost from "../../../../components/Quest/Post/CreatePost";
import { QuestContext } from "../../../../context/QuestContext";

export default function PostsPage() {
  const router = useRouter();

  const { questId, completedAt } = useContext(QuestContext);
  const url = `/quests/${questId}/posts`;

  const onCreatePostClick = () => {
    router.push(`/quests/${questId}/posts/create`);
  };

  return (
    <div>
      <CreatePost
        onCreatePostClick={onCreatePostClick}
        rootStyles={{ marginBottom: 3 }}
        disabled={Boolean(completedAt)}
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
