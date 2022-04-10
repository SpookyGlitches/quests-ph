import { Stack } from "@mui/material";
import Post from "./Post";

const PostsList = ({ posts }) => {
  return (
    <div>
      <Stack spacing={4}>
        {posts.map((post) => {
          return <Post key={post.postId} post={post} />;
        })}
      </Stack>
    </div>
  );
};

export default PostsList;
