import { Popover, ToggleButton } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import StyledToggleButtonGroup from "../../Common/StyledToggleButtonGroup";
import Emoji from "./Emoji";

export default function ReactOptions(props) {
  const { open, anchor, setOpen, postId, postReacts, questId } = props;
  const { mutate } = useSWRConfig();
  const session = useSession();
  const userId = session?.data?.user?.userId;
  const closeReactOptions = () => {
    setOpen(false);
  };

  const addReact = async (type) => {
    await axios.post(`/api/quests/${questId}/posts/${postId}/reacts`, {
      type,
    });
  };

  const updateReact = async (type, selected) => {
    await axios.put(
      `/api/quests/${questId}/posts/${postId}/reacts/${selected.postReactId}`,
      {
        type,
      },
    );
  };

  const deleteReact = async (postReactId) => {
    await axios.delete(
      `/api/quests/${questId}/posts/${postId}/reacts/${postReactId}`,
    );
  };

  const getSelected = () => {
    const currentReact = postReacts.find(
      (react) => react.partyMember?.user?.userId === userId,
    );
    return currentReact;
  };

  const handleReactClick = async (type) => {
    const selected = getSelected();

    try {
      if (!selected) await addReact(type);
      else if (selected.type === type) await deleteReact(selected.postReactId);
      else await updateReact(type, selected);
      // await addReact(type);
      // todo, ea: dont revalidate
      mutate(`/quests/${questId}/posts/${postId}`);
      mutate(`/quests/${questId}/posts`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={closeReactOptions}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <StyledToggleButtonGroup
        size="small"
        sx={{ margin: 0 }}
        value={getSelected()?.type}
        color="primary"
        exclusive
      >
        {["LAUGH", "PARTY", "SURPRISED", "CRYING", "SAD"].map((type) => {
          return (
            <ToggleButton
              key={type}
              sx={{ padding: 0, margin: 0 }}
              value={type}
              onClick={() => handleReactClick(type)}
            >
              <Emoji type={type} height="40" width="40" />
            </ToggleButton>
          );
        })}
      </StyledToggleButtonGroup>
    </Popover>
  );
}
