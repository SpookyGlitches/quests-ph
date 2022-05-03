import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { add } from "date-fns";
import { useSWRConfig } from "swr";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import {
  QuestDifficulty,
  QuestVisibility,
  QuestCategory,
} from "@prisma/client";
import { useEffect, useState, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Step2 from "../../../../components/Quest/Create/Step2";
import {
  step2Validations,
  wishValidation,
} from "../../../../validations/quest";
import WishInput from "../../../../components/Quest/Create/WishInput";
import AppLayout from "../../../../components/Layouts/AppLayout";
import { QuestContext } from "../../../../context/QuestContext";
import CustomCircularProgress from "../../../../components/Common/CustomSpinner";

const DialogItem = ({ handleOk, handleCancel, open, loading }) => {
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle color="primary">Delete Quest</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this Quest? All associated data will
          be lost.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleOk} disabled={loading}>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function Edit() {
  const router = useRouter();

  const quest = useContext(QuestContext);
  const {
    wish,
    estimatedStartDate,
    estimatedEndDate,
    completedAt,
    difficulty,
    visibility,
    category,
    questId,
  } = quest;
  const completed = Boolean(completedAt);
  const wishItem = <WishInput disabled={completed} />;
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useSWRConfig();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    shouldUnregister: true,
    resolver: yupResolver(step2Validations.concat(wishValidation)),
    defaultValues: {
      wish: "",
      difficulty: QuestDifficulty.EASY,
      visibility: QuestVisibility.PRIVATE,
      category: QuestCategory.SOCIAL,
      startDate: new Date(),
      endDate: add(new Date(), { days: 1 }),
    },
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    if (!quest) return;
    setValue("wish", wish);
    setValue("startDate", estimatedStartDate);
    setValue("endDate", estimatedEndDate);
    setValue("difficulty", difficulty);
    setValue("visibility", visibility);
    setValue("category", category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest]);

  const submitForm = async (values) => {
    try {
      enqueueSnackbar("Updated successfully.");
      await axios.put(`/api/quests/${questId}`, values);
      mutate(`/quests/${questId}`, { ...quest, ...values });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const deleteQuest = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/quests/${questId}`);
      router.replace("/quests");
      setOpenDeleteModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!quest) {
    return <CustomCircularProgress />;
  }

  return (
    <Paper sx={{ padding: 3 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Typography variant="h5" color="primary" marginBottom={4}>
            Edit Quest
          </Typography>
          <Stack
            spacing={4}
            sx={{
              paddingX: {},
            }}
          >
            <Step2
              wishItem={wishItem}
              disables={{
                visibility: true,
                wish: completed,
                category: completed,
                difficulty: true,
                startDate: completed,
                endDate: completed,
              }}
            />
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 3,
              marginTop: 4,
            }}
          >
            <Button type="button" onClick={toggleDeleteModal}>
              Delete
            </Button>
            <Button type="submit" variant="contained" disabled={completed}>
              Edit
            </Button>
          </Box>
        </form>
      </FormProvider>
      <DialogItem
        open={openDeleteModal}
        handleOk={deleteQuest}
        handleCancel={toggleDeleteModal}
        loading={loading}
      />
    </Paper>
  );
}

Edit.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
