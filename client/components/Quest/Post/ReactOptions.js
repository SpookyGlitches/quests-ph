import { Popover, ToggleButton } from "@mui/material";
import StyledToggleButtonGroup from "../../Common/StyledToggleButtonGroup";
import Emoji from "./Emoji";

export default function ReactOptions(props) {
  const { open, anchor, setOpen, selected, handleReactClick } = props;

  const closeReactOptions = () => {
    setOpen(false);
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
        value={selected?.type}
        color="primary"
        exclusive
      >
        {["LAUGH", "PARTY", "SURPRISED", "CRYING", "SAD"].map((type) => {
          return (
            <ToggleButton
              key={type}
              onClick={() => handleReactClick(type)}
              sx={{ padding: 0, margin: 0 }}
              value={type}
            >
              <Emoji type={type} height="40" width="40" />
            </ToggleButton>
          );
        })}
      </StyledToggleButtonGroup>
    </Popover>
  );
}
