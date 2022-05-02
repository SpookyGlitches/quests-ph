import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Select,
  MenuItem,
  DialogContentText,
  Stack,
  InputLabel,
  FormControl,
  DialogActions,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
// eslint-disable-next-line
import { useSession, getSession } from "next-auth/react";
// eslint-disable-next-line
import AppLayout from "../components/Layouts/AppLayout";
import CreatePost from "../components/Quest/Post/CreatePost";
import PostsList from "../components/Quest/Post/PostsList";
import Footer from "../components/Common/FooterHome";
import Reminders from "../components/Common/Reminders";
import PeopleYouMayKnow from "../components/Common/PeopleYouMayKnow";
import DocumentTitle from "../components/Common/DocumentTitle";

function CreatePostModal({ open, setOpen }) {
  const { data: quests } = useSWR(open ? "/quests?status=ACTIVE" : null);
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
// function Copyright() {
//   const year = new Date().getFullYear();
//   return (
//     <Typography align="center" sx={{ fontWeight: "medium", fontSize: "13px" }}>
//       {`Copyright © Quests ${year}`}
//     </Typography>
//   );
// }
export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={4}>
      <DocumentTitle title="Home" />
      <Grid item xs={12} lg={8}>
        <Box>
          <CreatePost
            onCreatePostClick={() => setOpen(true)}
            rootStyles={{ marginBottom: 4 }}
          />
          <PostsList url="/home" searchParams={{ take: 5 }} />
        </Box>
        <CreatePostModal open={open} setOpen={setOpen} />
      </Grid>
      <Grid item xs={12} lg={4} display={{ md: "block", xs: "none" }}>
        <Box sx={{}}>
          <Stack spacing={2}>
            <Reminders />
            <PeopleYouMayKnow />
            <Footer />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

Home.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/landing",
      },
    };
  }

  return {
    props: {},
  };
}
