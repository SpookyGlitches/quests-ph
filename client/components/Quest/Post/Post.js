import { Paper, Divider, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostActions from "./PostActions";

const Post = ({ postId, questId, children, onSpecificPost }) => {
  const session = useSession();
  const userId = session.data?.user?.userId;
  const router = useRouter();
  const { data: post } = useSWR(
    postId && questId ? `/quests/${questId}/posts/${postId}` : null,
  );
  const { data: postReacts } = useSWR(
    questId && postId ? `/quests/${questId}/posts/${postId}/reacts` : null,
  );
  const isAuthor = post?.partyMember?.userId === userId;

  const navigateToPost = () => {
    if (!onSpecificPost) router.push(`/quests/${questId}/posts/${postId}`);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {post ? (
        <PostHeader
          createdAt={post.createdAt}
          isAuthor={isAuthor}
          userId={post.partyMember.userId}
          fullName={post.partyMember.user.fullName}
          displayName={post.partyMember.user.displayName}
          image={post.partyMember.user.image}
          postId={postId}
          questId={questId}
          updatedAt={post.updatedAt}
        />
      ) : (
        <Skeleton sx={{ minHeight: 50 }} />
      )}
      {post ? (
        <PostBody
          title={post.title}
          body={post.body}
          postFiles={post.postFiles}
          onClick={navigateToPost}
          onSpecificPost={onSpecificPost}
        />
      ) : (
        <Skeleton sx={{ minHeight: 100 }} />
      )}

      {postReacts && post ? (
        <>
          <PostFooter
            postReacts={postReacts}
            commentsCount={post.comments.length}
            onCommentsCountClick={navigateToPost}
            postId={postId}
            questId={questId}
          />
          <Divider />
          <PostActions
            postReacts={postReacts}
            postId={postId}
            questId={questId}
            disabled={Boolean(post.partyMember.quest.completedAt)}
          />
        </>
      ) : (
        <Skeleton sx={{ minHeight: 40 }} />
      )}

      {/* Comments Section */}
      {children}
    </Paper>
  );
};

export default Post;
