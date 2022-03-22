import {
  Typography,
  Box,
  StepLabel,
  Stack,
  Stepper,
  Button,
  Step,
} from "@mui/material";
import { add } from "date-fns";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  QuestDifficulty,
  QuestVisibility,
  QuestCategory,
} from "@prisma/client";
import AppLayout from "../../components/Layouts/AppLayout";
import Step1 from "../../components/Quest/Create/Step1";
import Step2 from "../../components/Quest/Create/Step2";
import { createQuestValidation } from "../../validations/quest";
import WishInput from "../../components/Quest/Create/WishInput";

const steps = ["Set the WOOP", "Configure the settings"];

const wishItem = <WishInput />;

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentValidationSchema = createQuestValidation[activeStep];
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
    defaultValues: {
      wish: "",
      outcome: "",
      obstacle: "",
      plan: "",
      category: QuestCategory.SOCIAL,
      difficulty: QuestDifficulty.EASY,
      visibility: QuestVisibility.PRIVATE,
      startDate: new Date(),
      endDate: add(new Date(), { days: 1 }),
    },
  });
  const { trigger, handleSubmit } = methods;

  const postData = async (values) => {
    try {
      setLoading(true);
      const {
        data: { quest },
      } = await axios.post("/api/quests/", values);
      router.push(`/quests/${quest.questId}/overview`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleNext = async () => {
    if (activeStep >= steps.length) return;

    const valid = await trigger();
    if (!valid) return;

    if (activeStep < steps.length - 1)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      handleSubmit(postData)();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "80%",
            },
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Create a Quest
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <FormProvider {...methods}>
            <form>
              <Stack spacing={4}>
                {activeStep === 0 ? <Step1 wishItem={wishItem} /> : <Step2 />}
              </Stack>
            </form>
          </FormProvider>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={
                activeStep === 0 || activeStep === steps.length || loading
              }
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext} disabled={loading}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
};

export default Create;
