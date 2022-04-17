import {
  Box,
  Avatar,
  Typography,
  Stack,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import { formatDistance, format } from "date-fns";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReactOptions from "../ReactOptions";
import EmojiStack from "../EmojisStack";

export default function CommentItem({
  comment,
  questId,
  postId,
  editComment,
  deleteComment,
}) {
  const [reactOptionsAnchor, setReactOptionsAnchor] = useState(null);
  const [openReactOptions, setOpenReactOptions] = useState(false);

  const session = useSession();
  const { mutate } = useSWRConfig();
  const userId = session.data?.user?.userId;

  const toggleReactOptions = (event) => {
    setReactOptionsAnchor(event.currentTarget);
    setOpenReactOptions(!openReactOptions);
  };
  const selected = comment.commentReacts.find(
    (react) => react.partyMember.user.userId === userId,
  );

  const addReact = async (type, commentId) => {
    await axios.post(
      `/api/quests/${questId}/posts/${postId}/comments/${commentId}/reacts`,
      {
        type,
      },
    );
  };

  const updateReact = async (type, commentId, commentReactId) => {
    await axios.put(
      `/api/quests/${questId}/posts/${postId}/comments/${commentId}/reacts/${commentReactId}`,
      {
        type,
      },
    );
  };
  const deleteReact = async (commentReactId, commentId) => {
    await axios.delete(
      `/api/quests/${questId}/posts/${postId}/comments/${commentId}/reacts/${commentReactId}`,
    );
  };

  const handleReactClick = async (type, commentId) => {
    try {
      if (!selected) await addReact(type, commentId);
      else if (selected.type === type)
        await deleteReact(selected.commentReactId, commentId);
      else await updateReact(type, commentId, selected.commentReactId);
      // todo, ea: dont revalidate
      mutate(`/quests/${questId}/posts/${postId}/comments`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
          "&:hover .PostOptions": {
            display: "flex",
          },
        }}
        key={comment.commentId}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {comment.partyMember.user.image}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            mt: 0,
            flexGrow: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              sx={{ fontWeight: "regular", mb: 0 }}
              variant="subtitle2"
            >
              {comment.partyMember.user.displayName}

              <Tooltip
                title={
                  <div>
                    <div>
                      Created at{" "}
                      {format(
                        new Date(comment.createdAt),
                        "MMMM d, yyyy HH:mm:ss",
                      )}
                    </div>
                    <div>
                      Updated at{" "}
                      {format(
                        new Date(comment.updatedAt),
                        "MMMM d, yyyy HH:mm:ss",
                      )}
                    </div>
                  </div>
                }
                describeChild
              >
                <Typography variant="caption" sx={{ color: "grey.700" }}>
                  {` ${formatDistance(new Date(comment.createdAt), new Date(), {
                    addSuffix: true,
                  })}`}
                </Typography>
              </Tooltip>
            </Typography>

            <Box
              sx={{
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
                width: "100%",
                mt: 0.5,
              }}
            >
              <Typography variant="body2">{comment.content}</Typography>
              <Box sx={{ mt: 1 }}>
                <EmojiStack
                  reacts={comment.commentReacts}
                  height={24}
                  width={24}
                  spacing={-1}
                />
              </Box>
              <Stack
                spacing={1}
                direction="row"
                sx={{ alignItems: "center", mt: 0.5 }}
              >
                <IconButton size="small" onClick={toggleReactOptions}>
                  <AddReactionRoundedIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Box>
          </Box>
          {comment.partyMember.user.userId === userId && (
            <Box
              sx={{
                display: {
                  xs: "flex",
                  lg: "none",
                },
                alignItems: "center",
                justifyContent: "center",
              }}
              className="PostOptions"
            >
              <IconButton
                size="small"
                onClick={() => editComment(comment.commentId, comment.content)}
              >
                <EditRoundedIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => deleteComment(comment.commentId)}
              >
                <DeleteRoundedIcon fontSize="inherit" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <Divider light />
      <ReactOptions
        open={openReactOptions}
        anchor={reactOptionsAnchor}
        setOpen={setOpenReactOptions}
        handleReactClick={(type) => handleReactClick(type, comment.commentId)}
        selected={selected}
      />
    </>
  );
}
