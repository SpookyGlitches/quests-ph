import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { add } from "date-fns";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Step2 from "../../../../components/Quest/Create/Step2";
import { step2Validations } from "../../../../validations/createQuest";
import { QuestContext } from "../../../../context/QuestContext";

export default function Edit() {
  const router = useRouter();
  const quest = useContext(QuestContext);
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(step2Validations),
    defaultValues: {
      difficulty: "EASY",
      visibility: "PUBLIC",
      category: "HEALTH",
      startDate: new Date(),
      endDate: add(new Date(), { days: 1 }),
    },
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    setValue("startDate", quest.estimatedStartDate);
    setValue("endDate", quest.estimatedEndDate);
    setValue("difficulty", quest.difficulty);
    setValue("visibility", quest.visibility);
    setValue("category", quest.category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quest]);

  const updateSettings = async (values) => {
    try {
      await axios.put(`/api/quests/${quest.id}`, values);
      router.push(`/quests/${quest.id}/overview`);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleDeleteModal = async () => {
    try {
      await axios.delete(`/api/quests/${quest.id}`);
    } catch (err) {
      console.log("error delete");
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
            <Step2 />
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={toggleDeleteModal}
            >
              Delete
            </Button>
            <Button type="submit" variant="contained">
              Edit
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

Edit.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
