/* eslint-disable no-await-in-loop */
import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import FileDropzone from "../../Common/FileDropzone";
import ImagesPreviewList from "./Images/ImagesPreviewList";

function getFileExtension(filename) {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}

export default function CreatePost() {
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user?.userId;
  const { questId } = router.query;

  const [newlyUploadedFiles, setNewlyUploadedFiles] = useState([]);
  const methods = useForm({ defaultValues: { title: "", body: "" } });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const uploadFiles = async (acceptedFiles) => {
    const uploads = [];
    for (let x = 0; x < acceptedFiles.length; x++) {
      const item = acceptedFiles[x];
      const id = uuidv4();
      const fileName = `quests/${questId}/userPosts/${userId}/${id}.${getFileExtension(
        item.name,
      )}`;
      try {
        const { data } = await axios.get(
          `/api/quests/${questId}/posts/upload?type=${encodeURIComponent(
            item.type,
          )}&fileName=${encodeURIComponent(fileName)}`,
        );

        await axios.put(data, item, {
          headers: {
            "content-type": item.type,
          },
        });
        uploads.push({ path: fileName });
      } catch (err) {
        console.log(err);
      }
    }
    setNewlyUploadedFiles([...newlyUploadedFiles, ...uploads]);
  };

  const onSubmit = async (values) => {
    try {
      console.log(values);
      console.log(newlyUploadedFiles);
      await axios.post(`/api/quests/${questId}/posts`, {
        ...values,
        files: newlyUploadedFiles,
      });
    } catch (err) {
      console.log(err);
    }
  };
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
        backgroundColor: "background.paper",
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
            Create a Post
          </Typography>
          <Typography variant="subtitle1">
            You can upload images or a video. Share your progress or anything!
          </Typography>
        </div>
        <FormProvider {...methods}>
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
                    error={Boolean(errors.title)}
                    helperText={
                      errors.outcome
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
                    label="Content"
                    multiline
                    minRows={3}
                    maxRows={8}
                    onChange={onChange}
                    value={value}
                    error={Boolean(errors.title)}
                    helperText={
                      errors.body
                        ? errors.body.message
                        : "Tell us more about your post"
                    }
                  />
                )}
              />
              <FileDropzone uploadFiles={uploadFiles} />

              <Box>
                <ImagesPreviewList files={newlyUploadedFiles} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  Create Post
                </Button>
              </Box>
            </Stack>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}
