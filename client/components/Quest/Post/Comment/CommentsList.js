import { Stack } from "@mui/material";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";
import CommentItem from "./CommentItem";

export default function CommmentsList({
  questId,
  postId,
  commentFormRef,
  setUpdating,
}) {
  const { data: comments, mutate: mutateComments } = useSWR(
    questId && postId ? `/quests/${questId}/posts/${postId}/comments` : null,
  );
  const { mutate } = useSWRConfig();
  const session = useSession();
  const userId = session.data?.user?.userId;

  const deleteComment = async (commentId) => {
    try {
      setUpdating({ isUpdating: false, comment: null });
      await axios.delete(
        `/api/quests/${questId}/posts/${postId}/comments/${commentId}`,
      );
      const filtered = comments.filter(
        (comment) => comment.commentId !== commentId,
      );
      // todo: dont revalidate
      mutate(`/quests/${questId}/posts/${postId}`);
      mutateComments(filtered, { revalidate: false });
    } catch (err) {
      console.error(err);
    }
  };

  const editComment = (commentId, content) => {
    commentFormRef.current.scrollIntoView();

    setUpdating({
      isUpdating: true,
      comment: {
        commentId,
        content,
      },
    });
  };

  if (!comments || !userId) {
    return <div>Loading</div>;
  }

  return (
    <Stack spacing={1}>
      {comments.map((comment) => {
        return (
          <CommentItem
            comment={comment}
            key={comment.commentId}
            questId={questId}
            postId={postId}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        );
      })}
    </Stack>
  );
}
