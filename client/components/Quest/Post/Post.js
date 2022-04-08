import {
  Box,
  Avatar,
  Typography,
  Button,
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
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import axios from "axios";
import ReactOptions from "./ReactOptions";
import EmojiStack from "./EmojisStack";

const Post = ({ post, children }) => {
  const router = useRouter();
  const { questId } = router.query;
  const session = useSession();
  const userId = session.data?.user?.userId;
  const { data: postFiles } = useSWR(
    post.postId && questId
      ? `/quests/${questId}/posts/${post.postId}/postFiles`
      : null,
  );

  const { mutate } = useSWRConfig();
  const [postOptionsAnchor, setPostOptionsAnchor] = useState(null);
  const [openPostOptions, setOpenPostOptions] = useState(false);

  const [reactOptionsAnchor, setReactOptionsAnchor] = useState(null);
  const [openReactOptions, setOpenReactOptions] = useState(false);

  const handlePostOptionsClick = (event) => {
    event.stopPropagation();
    setPostOptionsAnchor(event.currentTarget);
    setOpenPostOptions(!openPostOptions);
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

  const toggleReactOptions = (event) => {
    event.stopPropagation();
    setReactOptionsAnchor(event.currentTarget);
    setOpenReactOptions(!openReactOptions);
  };

  const addReact = async (type) => {
    await axios.post(`/api/quests/${questId}/posts/${post.postId}/reacts`, {
      type,
    });
  };

  const updateReact = async (type, selected) => {
    await axios.put(
      `/api/quests/${questId}/posts/${post.postId}/reacts/${selected.postReactId}`,
      {
        type,
      },
    );
  };

  const deleteReact = async (postReactId) => {
    await axios.delete(
      `/api/quests/${questId}/posts/${post.postId}/reacts/${postReactId}`,
    );
  };

  const getSelected = (postReacts) => {
    const currentReact = postReacts.find(
      (react) => react.partyMember?.user?.userId === userId,
    );
    return currentReact;
  };

  const handleReactClick = async (type, postReacts) => {
    const selected = getSelected(postReacts);
    try {
      if (!selected) await addReact(type);
      else if (selected.type === type) await deleteReact(selected.postReactId);
      else await updateReact(type, selected);
      // todo, ea: dont revalidate
      mutate(`/quests/${questId}/posts/${post.postId}`);
      mutate(`/quests/${questId}/posts`);
    } catch (error) {
      console.error(error);
    }
  };

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
            {post.partyMember.user.displayName}
          </Avatar>
          <Box sx={{ flexGrow: 1, alignItems: "flex-start" }}>
            <Typography variant="body1" sx={{ m: 0, p: 0 }}>
              {post.partyMember.user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "regular" }}>
              {formatRelative(new Date(post.createdAt), new Date())}
            </Typography>
          </Box>
          <Box>
            {post.partyMember.user.userId === userId && (
              <IconButton size="small" onClick={handlePostOptionsClick}>
                <MoreHorizRoundedIcon />
              </IconButton>
            )}
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
            {postFiles && postFiles.length !== 0 && (
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
              <EmojiStack
                spacing={-1}
                height={30}
                width={30}
                reacts={post.postReacts}
              />
            </Box>
            <Typography variant="caption" onClick={navigateToPost}>
              {post.comments?.length || 0} comments
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
            onClick={toggleReactOptions}
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

        {/* Comments  Section */}
        {children}
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
      <ReactOptions
        getSelected={() => getSelected(post.postReacts)}
        handleReactClick={(type) => handleReactClick(type, post.postReacts)}
        open={openReactOptions}
        anchor={reactOptionsAnchor}
        setOpen={setOpenReactOptions}
      />
    </>
  );
};
export default Post;
