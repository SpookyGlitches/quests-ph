import { Box, Avatar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import PostsList from "../../../../components/Quest/Post/PostsList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";

const Index = () => {
  const {
    query: { questId },
  } = useRouter();

  const { data: posts } = useSWR(questId ? `/quests/${questId}/posts` : null);

  if (!posts) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Box
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
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "grey.700" }}>
            <Link href={`/quests/${questId}/posts/create`}>Create a Post</Link>
          </Typography>
        </Box>
      </Box>
      <PostsList posts={posts} />
    </div>
  );
};
export default Index;

Index.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
