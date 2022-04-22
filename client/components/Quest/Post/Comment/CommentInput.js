import { TextField, Button, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useEffect } from "react";
import commentValidation from "../../../../validations/comment";

export default function CommentInput(props) {
  const { questId, postId, updating, setUpdating } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(commentValidation),
    defaultValues: {
      content: "",
    },
  });
  const { mutate } = useSWRConfig();

  const updateComment = async (values) => {
    const commentId = updating.comment?.commentId;
    try {
      mutate(
        `/quests/${questId}/posts/${postId}/comments`,
        (comments) => {
          const commentToUpdate = comments.findIndex(
            (comment) => comment.commentId === commentId,
          );
          if (commentToUpdate === -1) return comments;
          const newComments = [...comments];

          newComments[commentToUpdate] = {
            ...newComments[commentToUpdate],
            content: values.content,
          };
          return newComments;
        },
        { revalidate: false },
      );
      reset();
      setUpdating({ isUpdating: false, comment: null });
      await axios.put(
        `/api/quests/${questId}/posts/${postId}/comments/${commentId}`,
        values,
      );
      mutate(`/quests/${questId}/posts/${postId}/comments`);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async (values) => {
    try {
      await axios.post(
        `/api/quests/${questId}/posts/${postId}/comments`,
        values,
      );
      // todo, ea: dont revalidate
      mutate(`/quests/${questId}/posts/${postId}/comments`);
      mutate(`/quests/${questId}/posts/${postId}`);

      reset();
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (values) => {
    if (updating.isUpdating) return updateComment(values);
    return addComment(values);
  };

  useEffect(() => {
    if (updating.isUpdating && updating.comment) {
      setValue("content", updating.comment.content);
    }
    if (!updating.isUpdating && !updating.comment) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updating]);

  const cancelEditing = () => {
    reset();
    setUpdating({ isUpdating: false, comment: null });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            onChange={onChange}
            minRows={2}
            value={value}
            label="Write something..."
            maxRows={4}
            size="small"
            variant="outlined"
            error={Boolean(errors.content)}
            helperText={errors.content ? errors.content.message : ""}
            multiline
          />
        )}
      />
      <Box sx={{ display: "flex", mt: 2, gap: 2, justifyContent: "end" }}>
        {updating.isUpdating && <Button onClick={cancelEditing}>Cancel</Button>}
        <Button variant="contained" type="submit" size="small">
          Submit
        </Button>
      </Box>
    </form>
  );
}
