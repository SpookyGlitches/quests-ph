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
import AppLayout from "../components/Layouts/AppLayout";
import CreatePost from "../components/Quest/Post/CreatePost";
import PostsList from "../components/Quest/Post/PostsList";

function CreatePostModal({ open, setOpen }) {
  const { data: quests } = useSWR(open ? "/quests?" : null);
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const navigateToQuest = (values) => {
    router.push(`/quests/${values.quest}/posts/create`);
  };

  const renderMenuItems = () =>
    quests.map((quest) => {
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
    });

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
                      {quests ? renderMenuItems() : null}
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

  return (
    <>
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
        <PostsList url="/home" take={5} />
      </Box>
      <CreatePostModal open={open} setOpen={setOpen} />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
