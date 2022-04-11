import { Typography, Stack, Button } from "@mui/material";
import { useState } from "react";

const FilterHolder = () => {
  const [toggleOutgoing, setToggleOutgoing] = useState(false);
  const [toggleIncoming, setToggleIncoming] = useState(false);
  const [toggleFriends, setToggleFriends] = useState(false);

  const handleClickOutgoing = async () => {
    setToggleOutgoing((prev) => !prev);
    console.log(toggleOutgoing);
  };

  const handleClickIncoming = async () => {
    setToggleIncoming((prev) => !prev);
    console.log(toggleIncoming);
  };

  const handleClickFriends = async () => {
    setToggleFriends((prev) => !prev);
    console.log(toggleFriends);
  };

  return (
    <Stack sx={{ margin: "2rem" }} spacing={2} direction="row">
      <Button
        sx={{
          backgroundColor: "background.paper",
          borderRadius: (theme) => theme.shape.borderRadius,
          ...(toggleOutgoing && {
            backgroundColor: "primary.main",
            borderRadius: (theme) => theme.shape.borderRadius,
          }),
        }}
        onClick={handleClickOutgoing}
      >
        <Typography
          sx={{
            variant: "body1",
            fontWeight: 600,
            p: 0.75,
            ...(toggleOutgoing && {
              color: "primary.contrastText",
            }),
          }}
        >
          Outgoing
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: "background.paper",
          borderRadius: (theme) => theme.shape.borderRadius,
          fontWeight: 600,
          ...(toggleIncoming && {
            backgroundColor: "primary.main",
            borderRadius: (theme) => theme.shape.borderRadius,
          }),
        }}
        onClick={handleClickIncoming}
      >
        <Typography
          sx={{
            variant: "body1",
            fontWeight: 600,
            p: 0.75,
            ...(toggleIncoming && {
              color: "primary.contrastText",
            }),
          }}
        >
          Incoming
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: "background.paper",
          borderRadius: (theme) => theme.shape.borderRadius,
          ...(toggleFriends && {
            backgroundColor: "primary.main",
            borderRadius: (theme) => theme.shape.borderRadius,
          }),
        }}
        onClick={handleClickFriends}
      >
        <Typography
          sx={{
            variant: "body1",
            fontWeight: 600,
            p: 0.75,
            ...(toggleFriends && {
              color: "primary.contrastText",
            }),
          }}
        >
          Friends
        </Typography>
      </Button>
    </Stack>
  );
};

export default FilterHolder;
