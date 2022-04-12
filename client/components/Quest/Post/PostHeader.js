import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { formatRelative } from "date-fns";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PostHeader(props) {
  const { isAuthor, image, displayName, postId, questId, createdAt } = props;

  const router = useRouter();
  const [postOptionsAnchor, setPostOptionsAnchor] = useState(null);
  const [openPostOptions, setOpenPostOptions] = useState(false);

  const handlePostOptionsClick = (event) => {
    event.stopPropagation();
    setPostOptionsAnchor(event.currentTarget);
    setOpenPostOptions(!openPostOptions);
  };

  const closePostOptions = () => {
    setOpenPostOptions(false);
  };

  const navigateToEditPage = () => {
    router.push(`/quests/${questId}/posts/${postId}/edit`);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar sx={{ backgroundColor: "pink" }}>
          {image || displayName.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1, alignItems: "flex-start" }}>
          <Typography variant="body2" sx={{ m: 0, p: 0 }}>
            {displayName}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "regular" }}>
            {formatRelative(new Date(createdAt), new Date())}
          </Typography>
        </Box>
        <div>
          {isAuthor && (
            <IconButton size="small" onClick={handlePostOptionsClick}>
              <MoreHorizRoundedIcon />
            </IconButton>
          )}
        </div>
      </Box>
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
      </Menu>
    </>
  );
}
