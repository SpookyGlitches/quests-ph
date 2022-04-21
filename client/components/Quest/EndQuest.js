import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  Box,
  DialogContent,
  Link as MuiLink,
  TextField,
  Paper,
} from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useSWRConfig } from "swr";
import Link from "next/link";
import { completeQuestValidation } from "../../validations/quest";
import { QuestContext } from "../../context/QuestContext";

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

function CustomLink({ label, link, childStyles }) {
  return (
    <Link href={link} passHref>
      <MuiLink sx={{ ...childStyles }}>{label}</MuiLink>
    </Link>
  );
}

export default function EndQuest() {
  const [open, setOpen] = useState(false);
  const { questId, completedAt } = useContext(QuestContext);
  const { mutate } = useSWRConfig();
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!completedAt ? (
        <>
          <Button
            variant="contained"
            color="primary"
            disabled={Boolean(completedAt)}
            onClick={handleButtonClick}
          >
            {completedAt ? "Quest Completed" : "Complete Quest"}
          </Button>
          <DialogItem
            open={open}
            handleCancel={handleCancelClick}
            handleOk={handleOk}
          />
        </>
      ) : (
        <Paper
          sx={{
            position: "relative",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h6" color="primary">
            Completed!
          </Typography>
          <Image
            src="/quests/completeQuest.svg"
            alt="image of aliens holding balloons"
            height={150}
            width={300}
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Well done! This Quest has been completed. You can{" "}
            <Typography color="primary" variant="inherit" component="span">
              <CustomLink label="join" link="/search" />
            </Typography>{" "}
            a new one or{" "}
            <Typography color="primary" variant="inherit" component="span">
              <CustomLink label="start your own" link="/quests/create" />
            </Typography>
            .
          </Typography>
        </Paper>
      )}
    </>
  );
}
