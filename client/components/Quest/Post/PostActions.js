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

  const addReact = (type) => {
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
    mutate(`/quests/${questId}/posts/${postId}/reacts`, async (reactsData) => {
      try {
        const { data } = await axios.post(
          `/api/quests/${questId}/posts/${postId}/reacts`,
          {
            type,
          },
        );
        return [...reactsData, { partyMember: { userId }, ...data }];
      } catch {
        return reactsData;
      }
    });
  };

  const updateReact = (type, selectedReact) => {
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

    const newReacts = [...postReacts];
    const selectedIndex = newReacts.findIndex(
      (x) => x.postReactId === selectedReact.postReactId,
    );
    newReacts[selectedIndex] = {
      ...newReacts[selectedIndex],
      type,
    };

    mutate(
      `/quests/${questId}/posts/${postId}/reacts`,
      async () => {
        try {
          await axios.put(
            `/api/quests/${questId}/posts/${postId}/reacts/${selectedReact.postReactId}`,
            {
              type,
            },
          );
          return newReacts;
        } catch {
          return postReacts;
        }
      },
      { optimisticData: newReacts },
    );
  };

  const deleteReact = (postReactId) => {
    const optimisticReacts = postReacts.filter(
      (react) => react.postReactId !== selected.postReactId,
    );
    mutate(
      `/quests/${questId}/posts/${postId}/reacts`,
      async () => {
        try {
          await axios.delete(
            `/api/quests/${questId}/posts/${postId}/reacts/${postReactId}`,
          );
          return optimisticReacts;
        } catch {
          return optimisticReacts;
        }
      },
      { optimisticData: optimisticReacts },
    );
  };

  const handleReactClick = async (type) => {
    try {
      if (!selected) addReact(type);
      else if (selected.type === type) deleteReact(selected.postReactId);
      else updateReact(type, selected);
    } catch (error) {
      console.error(error);
    } finally {
      setOpenReactOptions(false);
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
