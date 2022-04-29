import {
  Box,
  Typography,
  Stack,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import { formatDistance, format } from "date-fns";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { useSWRConfig } from "swr";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSnackbar } from "notistack";
import ReactOptions from "../ReactOptions";
import EmojiStack from "../EmojisStack";
import { QuestContext } from "../../../../context/QuestContext";
import CustomAvatar from "../../../Common/CustomAvatar";

export default function CommentItem({
  comment,
  questId,
  postId,
  editComment,
  deleteComment,
}) {
  const [reactOptionsAnchor, setReactOptionsAnchor] = useState(null);
  const [openReactOptions, setOpenReactOptions] = useState(false);
  const { completedAt } = useContext(QuestContext);
  const session = useSession();
  const { mutate } = useSWRConfig();
  const { enqueueSnackbar } = useSnackbar();

  const userId = session.data?.user?.userId;

  const toggleReactOptions = (event) => {
    setReactOptionsAnchor(event.currentTarget);
    setOpenReactOptions(!openReactOptions);
  };
  const selected = comment.commentReacts.find(
    (react) => react.partyMember.user.userId === userId,
  );

  const addReact = async (type, commentId) => {
    if (completedAt) {
      enqueueSnackbar(
        "You cannot react since the Quest is already completed.",
        {
          variant: "error",
          preventDuplicate: true,
        },
      );
      return;
    }
    await axios.post(
      `/api/quests/${questId}/posts/${postId}/comments/${commentId}/reacts`,
      {
        type,
      },
    );
    mutate(`/quests/${questId}/posts/${postId}/comments`);
    setOpenReactOptions(false);
  };

  const updateReact = async (type, commentId, commentReactId) => {
    if (completedAt) {
      enqueueSnackbar(
        "You cannot react since the Quest is already completed.",
        {
          variant: "error",
          preventDuplicate: true,
        },
      );
      return;
    }
    try {
      mutate(
        `/quests/${questId}/posts/${postId}/comments`,
        async (comments) => {
          const commentToUpdate = comments.findIndex(
            (commentItem) => commentItem.commentId === commentId,
          );
          if (commentToUpdate === -1) return comments;
          const x = comments[commentToUpdate].commentReacts.findIndex(
            (commentReact) => commentReact.commentReactId === commentReactId,
          );

          const copiedComments = [...comments];

          copiedComments[commentToUpdate].commentReacts[x] = {
            ...comments[commentToUpdate].commentReacts[x],
            type,
          };
          return copiedComments;
        },
        { revalidate: false },
      );
      setOpenReactOptions(false);
      await axios.put(
        `/api/quests/${questId}/posts/${postId}/comments/${commentId}/reacts/${commentReactId}`,
        {
          type,
        },
      );
    } catch (err) {
      console.error(err);
    }
  };
  const deleteReact = async (commentReactId, commentId) => {
    try {
      mutate(
        `/quests/${questId}/posts/${postId}/comments`,
        async (comments) => {
          const commentToUpdate = comments.findIndex(
            (commentItem) => commentItem.commentId === commentId,
          );
          if (commentToUpdate === -1) return comments;
          const newReacts = comments[commentToUpdate].commentReacts.filter(
            (commentReact) => commentReact.commentReactId !== commentReactId,
          );

          const copiedComments = [...comments];

          copiedComments[commentToUpdate].commentReacts = newReacts;
          return copiedComments;
        },
        { revalidate: false },
      );
      setOpenReactOptions(false);

      await axios.delete(
        `/api/quests/${questId}/posts/${postId}/comments/${commentId}/reacts/${commentReactId}`,
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleReactClick = async (type, commentId) => {
    try {
      if (!selected) await addReact(type, commentId);
      else if (selected.type === type)
        await deleteReact(selected.commentReactId, commentId);
      else await updateReact(type, commentId, selected.commentReactId);
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
        <CustomAvatar
          image={comment.partyMember.user.image}
          rootStyles={{ width: 32, height: 32 }}
          displayName={comment.partyMember.user.displayName}
        />
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
                <IconButton
                  size="small"
                  onClick={toggleReactOptions}
                  disabled={Boolean(completedAt) && !selected}
                >
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
                disabled={Boolean(completedAt)}
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
