import {
  Box,
  Typography,
  IconButton,
  Grid,
  Menu,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { format, formatDistance } from "date-fns";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CustomAvatar from "../../Common/CustomAvatar";

export default function PostHeader(props) {
  const {
    isAuthor,
    image,
    displayName,
    fullName,
    userId,
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
          <Tooltip
            placement="left"
            title={
              <Link href={`/profile/${userId}`} passHref>
                <Box
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    m: 1,
                    p: 1,
                  }}
                >
                  <Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginLeft: "10px", marginRight: "15px" }}
                    >
                      <CustomAvatar displayName={displayName} image={image} />
                    </Grid>
                  </Grid>
                  <Box sx={{ marginRight: "15px" }}>
                    <Typography variant="body1">{fullName}</Typography>
                    <Typography variant="body2">@{displayName}</Typography>
                  </Box>
                </Box>
              </Link>
            }
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "common.white",
                  "& .MuiTooltip-arrow": {
                    color: "common.white",
                  },
                  // border: "1px solid #755CDE",
                  boxShadow: 3,
                  cursor: "pointer",
                },
              },
            }}
            describeChild
          >
            <Typography variant="body2" sx={{ m: 0, p: 0 }} fontWeight="medium">
              {displayName}
            </Typography>
          </Tooltip>

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
