/* eslint-disable no-underscore-dangle */
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Button,
  Popper,
  Fade,
  IconButton,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import { formatRelative } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import Emoji1 from "../../Icons/Emoji1";
import Emoji2 from "../../Icons/Emoji2";
import Emoji3 from "../../Icons/Emoji3";

const Post = ({ post }) => {
  const router = useRouter();
  const { questId } = router.query;
  const { data: postFiles } = useSWR(
    post.postId && questId
      ? `/quests/${questId}/posts/${post.postId}/postFiles`
      : null,
  );
  const [postOptionsAnchor, setPostOptionsAnchor] = useState(null);
  const [openPostOptions, setOpenPostOptions] = useState(false);
  const [reactAnchor, setReactAnchor] = useState(null);
  const [openReact, setOpenReact] = useState(false);

  const handlePostOptionsClick = (event) => {
    event.stopPropagation();
    setPostOptionsAnchor(event.currentTarget);
    setOpenPostOptions(!openPostOptions);
  };
  const handleReactClick = (event) => {
    event.stopPropagation();
    setReactAnchor(event.currentTarget);
    setOpenReact(!openReact);
  };
  const closePostOptions = () => {
    setOpenPostOptions(false);
  };

  const navigateToPost = (event) => {
    event.stopPropagation();
    router.push(`/quests/${questId}/posts/${post.postId}`);
  };

  const openImage = (event, link) => {
    event.stopPropagation();
    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    // copy pasta  https://stackoverflow.com/questions/45046030/maintaining-href-open-in-new-tab-with-an-onclick-handler-in-react
  };

  const navigateToEditPage = () => {
    router.push(`/quests/${questId}/posts/${post.postId}/edit`);
  };

  if (!postFiles) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Post Header */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar sx={{ backgroundColor: "pink" }}>
            {post.user.displayName}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2">{post.user.displayName}</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "regular" }}>
              {formatRelative(new Date(post.createdAt), new Date())}
            </Typography>
          </Box>
          <Box>
            <IconButton size="small" onClick={handlePostOptionsClick}>
              <MoreHorizRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Post Content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ cursor: "pointer" }} onClick={navigateToPost}>
            <Typography variant="h6" sx={{ fontWeight: "medium" }}>
              {post.title}
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {post.body}
            </Typography>
          </Box>
          <Box style={{}}>
            {postFiles.length !== 0 && (
              <Carousel
                autoPlay={false}
                sx={{
                  zIndex: 1,
                  width: "100%",
                  height: "auto",
                }}
                indicators={false}
              >
                {postFiles.map((item) => {
                  const link = `${process.env.NEXT_PUBLIC_FILES_BASE_LINK}/${item.key}`;
                  return (
                    <Box
                      sx={{
                        position: "relative",
                        height: "400px",
                        maxHeight: "400px",
                        backgroundColor: "grey.200",
                        cursor: "pointer",
                      }}
                      key={item.key}
                    >
                      <Image
                        layout="fill"
                        onClick={(event) => openImage(event, link)}
                        objectFit="contain"
                        alt={item.title}
                        src={link}
                      />
                    </Box>
                  );
                })}
              </Carousel>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Stack direction="row" spacing={-1.5}>
                <Emoji1 width="30" height="30" />
                <Emoji2 width="30" height="30" />
                <Emoji3 width="30" height="30" />
              </Stack>
              <Typography variant="body2">6 reacts</Typography>
            </Box>
            <Typography variant="body2" onClick={navigateToPost}>
              3 comments
            </Typography>
          </Box>
        </Box>

        {/* Post Actions */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: 0,
            gap: 4,
          }}
        >
          <Button
            variant="text"
            startIcon={<AddReactionRoundedIcon />}
            onClick={handleReactClick}
            size="medium"
          >
            React
          </Button>
          <Button
            onClick={navigateToPost}
            variant="text"
            startIcon={<InsertCommentRoundedIcon />}
            size="medium"
          >
            Comment
          </Button>
        </Box>
      </Paper>

      <Menu
        dense
        open={openPostOptions}
        anchorEl={postOptionsAnchor}
        transition
        onClose={closePostOptions}
      >
        <MenuItem dense onClick={navigateToEditPage}>
          Edit
        </MenuItem>
        <MenuItem dense>Delete</MenuItem>
      </Menu>

      <Popper
        open={openReact}
        anchorEl={reactAnchor}
        placement="top"
        transition
        style={{ zIndex: 1 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Emoji1 width="40" height="40" />
              <Emoji2 width="40" height="40" />
              <Emoji3 width="40" height="40" />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
export default Post;
