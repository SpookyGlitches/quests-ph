import { Box, Button } from "@mui/material";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import { useState } from "react";
import { useSWRConfig } from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ReactOptions from "./ReactOptions";

export default function PostActions(props) {
  const { postReacts, questId, postId, disabled } = props;
  const router = useRouter();
  const session = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const [reactOptionsAnchor, setReactOptionsAnchor] = useState(null);
  const [openReactOptions, setOpenReactOptions] = useState(false);
  const userId = session.data?.user?.userId;

  const selected = postReacts.find(
    (react) => react.partyMember.userId === userId,
  );

  const addReact = async (type) => {
    if (disabled) {
      enqueueSnackbar(
        "You cannot react since the Quest is already completed.",
        {
          variant: "error",
          preventDuplicate: true,
        },
      );
      return;
    }
    const { data } = await axios.post(
      `/api/quests/${questId}/posts/${postId}/reacts`,
      {
        type,
      },
    );
    mutate(
      `/quests/${questId}/posts/${postId}/reacts`,

      (reactsData) => {
        return [...reactsData, { partyMember: { userId }, ...data }];
      },
      { revalidate: false },
    );
  };

  const updateReact = async (type, selectedReact) => {
    if (disabled) {
      enqueueSnackbar(
        "You cannot react since the Quest is already completed.",
        {
          variant: "error",
          preventDuplicate: true,
        },
      );
      return;
    }
    await axios.put(
      `/api/quests/${questId}/posts/${postId}/reacts/${selectedReact.postReactId}`,
      {
        type,
      },
    );
    mutate(
      `/quests/${questId}/posts/${postId}/reacts`,
      (reactsData) => {
        const newReactsData = [...reactsData];
        const selectedIndex = reactsData.findIndex(
          (x) => x.postReactId === selectedReact.postReactId,
        );
        newReactsData[selectedIndex] = {
          ...newReactsData[selectedIndex],
          type,
        };
        return newReactsData;
      },
      { revalidate: false },
    );
  };

  const deleteReact = async (postReactId) => {
    await axios.delete(
      `/api/quests/${questId}/posts/${postId}/reacts/${postReactId}`,
    );
    mutate(
      `/quests/${questId}/posts/${postId}/reacts`,
      (reactsData) => {
        return reactsData.filter(
          (react) => react.postReactId !== selected.postReactId,
        );
      },
      { revalidate: false },
    );
  };

  const handleReactClick = async (type) => {
    try {
      if (!selected) await addReact(type);
      else if (selected.type === type) await deleteReact(selected.postReactId);
      else await updateReact(type, selected);
    } catch (error) {
      console.error(error);
    }
  };

  const onReactClick = (event) => {
    event.stopPropagation();
    setReactOptionsAnchor(event.currentTarget);
    setOpenReactOptions(!openReactOptions);
  };

  const onCommentClick = () => {
    router.push(`/quests/${questId}/posts/${postId}?comment=true`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: 0,
          gap: 3,
        }}
      >
        <Button
          variant="text"
          startIcon={<AddReactionRoundedIcon />}
          onClick={onReactClick}
          size="medium"
          disabled={disabled && !selected}
        >
          React
        </Button>
        <Button
          onClick={onCommentClick}
          variant="text"
          startIcon={<InsertCommentRoundedIcon />}
          size="medium"
          disabled={disabled}
        >
          Comment
        </Button>
      </Box>
      <ReactOptions
        selected={selected}
        handleReactClick={(type) => handleReactClick(type)}
        open={openReactOptions}
        anchor={reactOptionsAnchor}
        setOpen={setOpenReactOptions}
      />
    </>
  );
}
