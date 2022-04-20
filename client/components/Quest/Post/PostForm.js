import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import postValidations from "../../../validations/post";
import { QuestContext } from "../../../context/QuestContext";

export default function PostForm({
  post,
  onSubmit,
  children,
  isUpdating,
  deletePost,
}) {
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user?.userId;
  const { questId } = router.query;
  const { completedAt } = useContext(QuestContext);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { title: "", body: "" },
    resolver: yupResolver(postValidations),
  });

  useEffect(() => {
    if (!post) return;
    setValue("title", post.title);
    setValue("body", post.body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (!userId || !questId) {
    return <div>Loading</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
          },
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <div>
          <Typography
            variant="h4"
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
            gutterBottom={false}
          >
            {isUpdating ? "Edit" : "Create "} Post
          </Typography>
          <Typography variant="body2">
            You can ask questions, upload images, and share your progress.
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label="Title"
                  onChange={onChange}
                  value={value}
                  disabled={Boolean(completedAt)}
                  error={Boolean(errors.title)}
                  helperText={
                    errors.title
                      ? errors.title.message
                      : "Add a title for your post"
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="body"
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label="Body"
                  multiline
                  minRows={3}
                  maxRows={8}
                  disabled={Boolean(completedAt)}
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors.body)}
                  helperText={
                    errors.body
                      ? errors.body.message
                      : "Tell us more about your post"
                  }
                />
              )}
            />

            <Box>{children}</Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: isUpdating ? "space-between" : "end",
              }}
            >
              {isUpdating && <Button onClick={deletePost}>Delete</Button>}
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={Boolean(completedAt)}
              >
                {isUpdating ? "Edit" : "Submit "} Post
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
