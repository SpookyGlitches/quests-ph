import { Popover, ToggleButton } from "@mui/material";
// import axios from "axios";
import StyledToggleButtonGroup from "../../Common/StyledToggleButtonGroup";
import Party from "../../Icons/Emojis/Party";
import Crying from "../../Icons/Emojis/Crying";
import Laugh from "../../Icons/Emojis/Laugh";
import Sad from "../../Icons/Emojis/Sad";
import Surprised from "../../Icons/Emojis/Surprised";

export default function ReactOptions({ open, anchor, setOpen }) {
  const closeReactOptions = () => {
    setOpen(false);
  };

  const addReact = async () => {
    try {
      //   await axios.post(`/api/quests/${questId}/posts/${post.postId}/reacts`);
      // alert("ok");
    } catch (err) {
      // alert(err.message);
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
      <StyledToggleButtonGroup size="small" sx={{ margin: 0 }} color="primary">
        <ToggleButton sx={{ padding: 0, margin: 0 }} fullWidth>
          <Laugh
            width="40"
            height="40"
            onClick={() => addReact("LAUGH")}
            style={{ cursor: "pointer" }}
          />
        </ToggleButton>
        <ToggleButton sx={{ padding: 0, margin: 0 }} selected>
          <Party
            width="40"
            height="40"
            onClick={() => addReact("SURPRISED")}
            style={{ cursor: "pointer" }}
          />
        </ToggleButton>
        <ToggleButton sx={{ padding: 0, margin: 0 }}>
          <Surprised
            width="40"
            height="40"
            onClick={() => addReact("SURPRISED")}
            style={{ cursor: "pointer" }}
          />
        </ToggleButton>
        <ToggleButton sx={{ padding: 0, margin: 0 }}>
          <Crying
            width="40"
            height="40"
            onClick={() => addReact("CRYING")}
            style={{ cursor: "pointer" }}
          />
        </ToggleButton>
        <ToggleButton sx={{ padding: 0, margin: 0 }}>
          <Sad
            width="40"
            height="40"
            onClick={() => addReact("PARTY")}
            style={{
              cursor: "pointer",
              borderRadius: 10,
            }}
          />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Popover>
  );
}
