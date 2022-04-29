import {
  Box,
  Typography,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { format, formatDistance } from "date-fns";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomAvatar from "../../Common/CustomAvatar";

export default function PostHeader(props) {
  const {
    isAuthor,
    image,
    displayName,
    postId,
    questId,
    createdAt,
    updatedAt,
  } = props;

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
        <CustomAvatar displayName={displayName} image={image} />
        <Box sx={{ flexGrow: 1, alignItems: "flex-start" }}>
          <Typography variant="body2" sx={{ m: 0, p: 0 }} fontWeight="medium">
            {displayName}
          </Typography>
          <Tooltip
            title={
              <div>
                <div>
                  Created at{" "}
                  {format(new Date(createdAt), "MMMM d, yyyy HH:mm:ss")}
                </div>
                <div>
                  Updated at{" "}
                  {format(new Date(updatedAt), "MMMM d, yyyy HH:mm:ss")}
                </div>
              </div>
            }
            describeChild
          >
            <Typography
              variant="body2"
              component="span"
              sx={{
                fontWeight: "regular",
                flexGrow: 0,
              }}
            >
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Tooltip>
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
