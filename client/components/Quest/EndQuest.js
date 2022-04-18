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
import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { completeQuestValidation } from "../../validations/quest";

const DialogItem = ({ handleOk, handleCancel, open }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(completeQuestValidation),
  });

  return (
    <Dialog maxWidth="sm" open={open}>
      <DialogTitle color="primary">Awesome!</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleOk)}>
          <Box sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
            <Typography variant="body2">
              It seems that everyone has completed their wishes. Please enter{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "primary.main", fontWeight: "medium" }}
              >
                everyone&apos;s completed
              </Typography>{" "}
              on the text field to complete the quest.
            </Typography>
            <Image
              src="/quests/completeQuest.svg"
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
                  placeholder="everyone's completed"
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
              Complete Quest
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
  const { questId } = router.query;
  const handleCancelClick = () => {
    setOpen(false);
  };
  const handleOk = async () => {
    try {
      await axios.put(`/api/quests/${questId}/complete`);
      mutate(`/quests/${questId}`, (quest) => {
        return { ...quest, completedAt: new Date() };
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Complete Quest
      </Button>
      <DialogItem
        open={open}
        handleCancel={handleCancelClick}
        handleOk={handleOk}
      />
    </>
  );
}
