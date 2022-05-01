import { Box, CircularProgress, Stack } from "@mui/material";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CommentItem from "./CommentItem";
import PopConfirm from "../../../Common/PopConfirm";

export default function CommmentsList({
  questId,
  postId,
  commentFormRef,
  setUpdating,
}) {
  const router = useRouter();
  const { data: comments, mutate: mutateComments } = useSWR(
    questId && postId ? `/quests/${questId}/posts/${postId}/comments` : null,
  );
  const { mutate } = useSWRConfig();
  const session = useSession();
  const userId = session.data?.user?.userId;

  const [confirmModalState, setConfirmModalState] = useState({
    handleOk: () => {},
    open: false,
  });

  const deleteComment = async (commentId) => {
    try {
      setUpdating({ isUpdating: false, comment: null });
      const filtered = comments.filter(
        (comment) => comment.commentId !== commentId,
      );
      mutateComments(filtered, { revalidate: false });
      // todo: dont revalidate
      mutate(`/quests/${questId}/posts/${postId}`);
      await axios.delete(
        `/api/quests/${questId}/posts/${postId}/comments/${commentId}`,
      );
      mutateComments(filtered, { revalidate: true });
      mutate(`/quests/${questId}/posts/${postId}`);
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

  const closeModal = () => {
    setConfirmModalState((prev) => ({ ...prev, open: false }));
  };

  const openModalForDelete = (commentId) => {
    setConfirmModalState({
      open: true,
      handleOk: () => deleteComment(commentId),
    });
  };

  useEffect(() => {
    if (router.query?.comment && comments && commentFormRef?.current) {
      commentFormRef.current.scrollIntoView();
    }
  }, [router, commentFormRef, comments]);

  if (!comments || !userId) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 100,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Stack spacing={1}>
      {comments.map((comment) => {
        return (
          <CommentItem
            comment={comment}
            key={comment.commentId}
            questId={questId}
            disabled
            postId={postId}
            editComment={editComment}
            deleteComment={(commentId) => openModalForDelete(commentId)}
          />
        );
      })}
      <Box sx={{ display: "" }} ref={commentFormRef} />
      <PopConfirm
        open={confirmModalState.open}
        handleCancel={closeModal}
        handleOk={confirmModalState.handleOk}
        title="Are you sure you want to delete this comment?"
      />
    </Stack>
  );
}
