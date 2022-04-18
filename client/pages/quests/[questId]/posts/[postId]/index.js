import { useRouter } from "next/router";
import QuestLayout from "../../../../../components/Layouts/QuestLayout";
import Post from "../../../../../components/Quest/Post/Post";
import AppLayout from "../../../../../components/Layouts/AppLayout";
import CommentsSection from "../../../../../components/Quest/Post/Comment/CommentsSection";

export default function PostPage() {
  const {
    query: { questId, postId },
  } = useRouter();

  return (
    <div>
      <Post postId={postId} questId={questId} onSpecificPost>
        <CommentsSection postId={postId} questId={questId} />
      </Post>
    </div>
  );
}

PostPage.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
