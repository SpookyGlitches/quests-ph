import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { add } from "date-fns";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Step2 from "../../../../components/Quest/Create/Step2";
import {
  step2Validations,
  wishValidation,
} from "../../../../validations/quest";
import { QuestContext } from "../../../../context/QuestContext";
import WishInput from "../../../../components/Quest/Create/WishInput";

const wishItem = <WishInput />;

const DialogItem = ({ handleOk, handleCancel, open, loading }) => {
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Delete Quest</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this Quest? All associated data will
          be lost
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} disabled={loading}>
          No
        </Button>
        <Button onClick={handleOk} disabled={loading}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function Edit() {
  const router = useRouter();
  const quest = useContext(QuestContext);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(step2Validations.concat(wishValidation)),
    defaultValues: {
      wish: "",
      difficulty: "EASY",
      visibility: "PUBLIC",
      category: "HEALTH",
      startDate: new Date(),
      endDate: add(new Date(), { days: 1 }),
    },
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    setValue("wish", quest.wish);
    setValue("startDate", quest.estimatedStartDate);
    setValue("endDate", quest.estimatedEndDate);
    setValue("difficulty", quest.difficulty);
    setValue("visibility", quest.visibility);
    setValue("category", quest.category);
  }, [quest]);

  const updateSettings = async (values) => {
    try {
      await axios.put(`/api/quests/${quest.id}`, values);
      router.push(`/quests/${quest.id}/overview`);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const deleteQuest = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/quests/${quest.id}`);
      router.replace("/quests");
      setOpenDeleteModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        padding: "1.5rem",
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(updateSettings)}>
          <Typography variant="h5" color="primary" marginBottom={4}>
            Edit Quest
          </Typography>
          <Stack
            spacing={4}
            sx={{
              paddingX: {
                sm: 0,
                md: "1rem ",
              },
            }}
          >
            <Step2 wishItem={wishItem} />
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Button type="button" onClick={toggleDeleteModal}>
              Delete
            </Button>
            <Button type="submit" variant="contained">
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
    </Box>
  );
}

Edit.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
