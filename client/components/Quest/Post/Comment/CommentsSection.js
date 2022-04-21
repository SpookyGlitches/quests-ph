import { Divider, Stack } from "@mui/material";
import { useState, useRef, useContext } from "react";
import { QuestContext } from "../../../../context/QuestContext";
import CommentInput from "./CommentInput";
import CommentsList from "./CommentsList";

export default function CommentsSection({ postId, questId }) {
  const [updating, setUpdating] = useState({
    isUpdating: false,
    comment: null,
  });
  const commentFormRef = useRef(null);
  const { completedAt } = useContext(QuestContext);
  return (
    <Stack spacing={3}>
      <Divider />
      <CommentsList
        questId={questId}
        postId={postId}
        updating={updating}
        commentFormRef={commentFormRef}
        setUpdating={setUpdating}
      />
      {!completedAt && (
        <CommentInput
          questId={questId}
          commentFormRef={commentFormRef}
          postId={postId}
          updating={updating}
          setUpdating={setUpdating}
        />
      )}
    </Stack>
  );
}
