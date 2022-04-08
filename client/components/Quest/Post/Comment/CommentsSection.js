import { Divider, Stack } from "@mui/material";
import { useState } from "react";
import CommentInput from "./CommentInput";
import CommentsList from "./CommentsList";

export default function CommentsSection({ postId, questId }) {
  const [updating, setUpdating] = useState({
    isUpdating: false,
    comment: null,
  });
  return (
    <Stack spacing={3}>
      <Divider />
      <CommentsList
        questId={questId}
        postId={postId}
        updating={updating}
        setUpdating={setUpdating}
      />
      <CommentInput
        questId={questId}
        postId={postId}
        updating={updating}
        setUpdating={setUpdating}
      />
    </Stack>
  );
}
