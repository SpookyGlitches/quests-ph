import { Button } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";

import VideoCameraFrontRoundedIcon from "@mui/icons-material/VideoCameraFrontRounded";

export default function EndQuest() {
  const { enqueueSnackbar } = useSnackbar();
  const [room, setRoom] = useState([]);

  const handleOk = async () => {
    try {
      // daily api call to post / create room
      const /* eslint-disable */ request = await fetch(
          "https://api.daily.co/v1/rooms/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer cb457e4b32f3fb42f63cb4fbeff1df2c1a6318425a0c963ffff6e0a98c43a86a`,
            },
            body: JSON.stringify({
              properties: {
                enable_prejoin_ui: true,
                enable_network_ui: true,
                enable_screenshare: true,
                enable_chat: true,
                exp: Math.round(Date.now() / 1000) + 300,
                eject_at_room_exp: false,
              },
            }),
          },
        )
          .then((res) => res.json())
          .then((data) => {
            enqueueSnackbar("Succesfully created video meeting room");
            setRoom(data.url);
          });
    } catch (err) {
      console.error(err);
    }
  };

  const handleButtonClick = () => {
    handleOk();
  };

  console.log(room);

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleButtonClick}
      startIcon={<VideoCameraFrontRoundedIcon />}
    >
      {room === " " ? (
        "New Meeting "
      ) : (
        <a href={room} target="_blank" rel="noreferrer">
          {room}
        </a>
      )}
    </Button>
  );
}
