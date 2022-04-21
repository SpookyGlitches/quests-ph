import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  Box,
  DialogContent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { completeQuestValidation } from "../../validations/quest";
import VideoCameraFrontRoundedIcon from "@mui/icons-material/VideoCameraFrontRounded";
import Link from "next/link";

const DialogItem = ({ handleOk, handleCancel, open }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  return (
    <Dialog maxWidth="sm" open={open}>
      <DialogTitle color="primary">See Everyone Together!</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleOk)}>
          <Box sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
            <Typography variant="body1">
              Experience the virtual focus group discussion in the comfort of
              your home.
            </Typography>
            <Image
              src="/images/video.svg"
              height={200}
              alt="image of aliens holding balloons"
              width={300}
            />

            <Controller
              control={control}
              name="text"
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Provide a Room Name"
                  size="small"
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors.text)}
                  helperText={errors.text ? errors.text.message : ""}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
              gap: 1,
              flexDirection: "column",
            }}
          >
            <Button fullWidth size="small" variant="contained" type="submit">
              Create Room
            </Button>
            <Button
              autoFocus
              onClick={handleCancel}
              type="button"
              fullWidth
              size="small"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function EndQuest() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [room, setRoom] = useState([]);
  const { questId } = router.query;
  const handleCancelClick = () => {
    setOpen(false);
  };
  const handleOk = async () => {
    try {
      // daily api call to post / create room
      const request = await fetch("https://api.daily.co/v1/rooms/", {
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
      })
        .then((res) => res.json())
        .then((data) => setRoom(data));
    } catch (err) {
      console.error(err);
    }
  };
  const handleButtonClick = () => {
    handleOk();
  };

  console.log(room);
  return (
    <>
      {room.length < 0 ? (
        <Link href={url} passHref>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleButtonClick}
            startIcon={<VideoCameraFrontRoundedIcon />}
          >
            {"Room Link : "}
            {url}
          </Button>
        </Link>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleButtonClick}
          startIcon={<VideoCameraFrontRoundedIcon />}
        >
          New Video Chat Room
        </Button>
      )}
      <DialogItem
        open={open}
        handleCancel={handleCancelClick}
        handleOk={handleOk}
      />
    </>
  );
}
