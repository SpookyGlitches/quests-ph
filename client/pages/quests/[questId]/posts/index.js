import { Box, Avatar, Typography, Paper } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import PostsList from "../../../../components/Quest/Post/PostsList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";

const Index = () => {
  const router = useRouter();
  const { questId } = router.query;
  const { data: posts } = useSWR(questId ? `/quests/${questId}/posts` : null);

  if (!posts) {
    return <div>Loading</div>;
  }

  const navigateToCreatePost = () => {
    router.push(`/quests/${questId}/posts/create`);
  };

  return (
    <div>
      <Paper
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          paddingX: 3,
          paddingY: 2,
          paddingLeft: 2,
          marginBottom: 3,
          gap: 2,
        }}
      >
        <Box sx={{}}>
          <Avatar sx={{}}>X</Avatar>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "background.default",
            height: 50,
            borderRadius: 1,
            paddingX: 1,
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={navigateToCreatePost}
        >
          <Typography variant="subtitle2" sx={{ color: "grey.700" }}>
            Create a Post
          </Typography>
        </Box>
      </Paper>
      <PostsList posts={posts} />
    </div>
  );
};
export default Index;

Index.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
