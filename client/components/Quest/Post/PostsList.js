import { Stack, Popper, Fade, Typography, Paper } from "@mui/material";
import Post from "./Post";
import { useState } from "react";
import Emoji1 from "../../Icons/Emoji1";
import Emoji2 from "../../Icons/Emoji2";
import Emoji3 from "../../Icons/Emoji3";

const PostsList = ({ posts }) => {
  // should i add the state here? or sa post jud? idk :|
  // for actions such as edit post
  const [postOptionsAnchor, setPostOptionsAnchor] = useState(null);
  const [openPostOptions, setOpenPostOptions] = useState(false);
  // for reacts
  const [reactAnchor, setReactAnchor] = useState(null);
  const [openReact, setOpenReact] = useState(false);

  const handlePostOptionsClick = (event) => {
    setPostOptionsAnchor(event.currentTarget);
    setOpenPostOptions(!openPostOptions);
  };
  const handleReactClick = (event) => {
    setReactAnchor(event.currentTarget);
    setOpenReact(!openReact);
  };

  return (
    <div>
      <Popper
        open={openPostOptions}
        anchorEl={postOptionsAnchor}
        placement="right-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ p: 2 }}>
              <Typography>Edit Post</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Popper
        open={openReact}
        anchorEl={reactAnchor}
        placement="top"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ p: 1 }}>
              <Emoji1 width="45" height="45" />
              <Emoji2 width="45" height="45" />
              <Emoji3 width="45" height="45" />
            </Paper>
          </Fade>
        )}
      </Popper>
      <Stack spacing={5}>
        {posts.map((data, index) => {
          return (
            <Post
              key={index}
              username={data.username}
              title={data.title}
              createdAt={data.createdAt}
              body={data.body}
              images={data.images}
              handlePostOptionsClick={handlePostOptionsClick}
              handleReactClick={handleReactClick}
            />
          );
        })}
      </Stack>
    </div>
  );
};

export default PostsList;
