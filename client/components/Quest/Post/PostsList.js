import { Stack } from "@mui/material";
import Post from "./Post";

const PostsList = ({ posts }) => {
  return (
    <Stack spacing={4}>
      {posts.map(({ postId, partyMember }) => {
        return (
          <Post key={postId} postId={postId} questId={partyMember.questId} />
        );
      })}
    </Stack>
  );
};

export default PostsList;
