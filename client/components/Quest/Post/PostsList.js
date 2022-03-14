import { Stack, Popper, Fade, Typography } from "@mui/material";
import { useState } from "react";
import Post from "./Post";
import Emoji1 from "../../Icons/Emoji1";
import Emoji2 from "../../Icons/Emoji2";
import Emoji3 from "../../Icons/Emoji3";
import StyledPaper from "../../Common/StyledPaper";

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
            <StyledPaper sx={{ padding: 1.5 }}>
              <Typography>Edit Post</Typography>
            </StyledPaper>
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
            <StyledPaper>
              <Emoji1 width="40" height="40" />
              <Emoji2 width="40" height="40" />
              <Emoji3 width="40" height="40" />
            </StyledPaper>
          </Fade>
        )}
      </Popper>
      <Stack spacing={5}>
        {posts.map((data) => {
          return (
            <Post
              key={`${data.username}/${data.title}`}
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
