import {
  Box,
  Avatar,
  Typography,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { formatRelative } from "date-fns";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import axios from "axios";
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

  const getSelected = (commentReacts) => {
    const currentReact = commentReacts.find(
      (react) => react.partyMember?.user?.userId === userId,
    );
    return currentReact;
  };

  const handleReactClick = async (type, commentReacts, commentId) => {
    const selected = getSelected(commentReacts);
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
          pr: 3,
          py: 1,
        }}
        key={comment.commentId}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {comment.partyMember.user.image}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 0,
            flexGrow: 1,
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "regular", mb: 0 }}
              variant="subtitle2"
            >
              {comment.partyMember.user.displayName}
              <Typography variant="caption" sx={{ color: "grey.700" }}>
                {` ${formatRelative(new Date(comment.createdAt), new Date())}`}
              </Typography>
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
                sx={{ alignItems: "center", mt: 1 }}
              >
                {comment.partyMember.user.userId !== userId ? (
                  <IconButton size="small" onClick={toggleReactOptions}>
                    <AddReactionRoundedIcon fontSize="inherit" />
                  </IconButton>
                ) : (
                  <>
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() =>
                        editComment(comment.commentId, comment.content)
                      }
                    >
                      Edit
                    </Typography>

                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => deleteComment(comment.commentId)}
                    >
                      Delete
                    </Typography>
                  </>
                )}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider light />
      <ReactOptions
        open={openReactOptions}
        anchor={reactOptionsAnchor}
        setOpen={setOpenReactOptions}
        handleReactClick={(type) =>
          handleReactClick(type, comment.commentReacts, comment.commentId)
        }
        getSelected={() => getSelected(comment.commentReacts)}
      />
    </>
  );
}
