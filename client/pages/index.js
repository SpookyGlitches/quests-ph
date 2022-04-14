import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Select,
  MenuItem,
  DialogContentText,
  InputLabel,
  FormControl,
  DialogActions,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import AppLayout from "../components/Layouts/AppLayout";
import CreatePost from "../components/Quest/Post/CreatePost";
import PostsList from "../components/Quest/Post/PostsList";

function CreatePostModal({ open, setOpen }) {
  const { data: quests } = useSWR("/quests");
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  if (!quests) {
    return <div>Loading</div>;
  }
  const navigateToQuest = (values) => {
    router.push(`/quests/${values.quest}/posts/create`);
  };
  return (
    <Dialog maxWidth="sm" fullWidth open={open}>
      <form onSubmit={handleSubmit(navigateToQuest)}>
        <DialogTitle color="primary">Where do you want to post?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Please choose the Quest you want to post on
              </Typography>
              <Controller
                name="quest"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    variant="filled"
                    sx={{
                      maxWidth: "100%",
                      minWidth: "100%",
                    }}
                  >
                    <InputLabel>Quest</InputLabel>
                    <Select onChange={onChange} value={value} required>
                      {quests.map((quest) => {
                        return (
                          <MenuItem
                            value={quest.questId}
                            sx={{
                              minWidth: "100%",
                              maxWidth: 320,
                            }}
                            key={quest.questId}
                          >
                            {quest.wish}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    // eslint-disable-next-line
    const { data: postIds } = useSWR("/home");
    if (!postIds) {
      return <div>Loading</div>;
    }
    return (
      <AppLayout>
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "80%",
              xl: "70%",
            },
          }}
        >
          <CreatePost onCreatePostClick={() => setOpen(true)} />
          <PostsList posts={postIds} />
        </Box>
        <CreatePostModal open={open} setOpen={setOpen} />
      </AppLayout>
    );
  }
  return (
    <>
      landing page ~ not signed in <br />
      <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
    </>
  );
}

// Home.getLayout = function getLayout(page) {
//   return {page}</AppLayout>;
// };

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
