import { Box, StepLabel, Stack, Stepper, Button, Step } from "@mui/material";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { MentorRegistration } from "../../validations/MentorRegistration";
import SignUpDisclaimer from "./SignUpDisclaimer";

const steps = ["", "", ""];

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  // eslint-disable-next-line no-undef
  const currentValidationSchema = MentorRegistration[activeStep];

  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
    defaultValues: {
      displayName: "",
      fullName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
      experience: " ",
      detailedExperience: "",
      fileUpload: "",
    },
  });

  const { trigger, handleSubmit, control } = methods;
  const here = (values) => {
    console.log(values);
  };
  const handleNext = async () => {
    if (activeStep >= steps.length) return;
    const valid = await trigger();
    if (!valid) return;
    if (activeStep < steps.length - 1)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      handleSubmit(here)();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
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
      {activeStep === 0 || activeStep === steps.length ? (
        <>{console.log("no prev button")}</>
      ) : (
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleBack}
          sx={{
            mb: 1,
            boxShadow: 0,
            ":hover": {
              bgcolor: "white",
              color: "white",
              boxShadow: 0,
            },
          }}
          style={{
            maxWidth: "100px",
            minWidth: "100px",
            backgroundColor: "transparent",
            color: "#B0B0B0",
          }}
        >
          <ArrowBackIosRoundedIcon
            style={{ float: "left", marginLeft: "-1.5em" }}
          />
          &nbsp; Back
        </Button>
      )}
      <FormProvider {...methods}>
        <form>
          <Stack spacing={4}>
            {activeStep === 0 ? (
              <Step1 control={control} memberType="mentor" />
            ) : null}
            {activeStep === 1 ? <Step2 control={control} /> : null}
            {activeStep === 2 ? <Step3 control={control} /> : null}
          </Stack>
        </form>
      </FormProvider>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Stack style={{ width: "100%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ mt: "-2em" }}
            fullWidth
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
          {activeStep === steps.length - 1 ? <SignUpDisclaimer /> : ""}
        </Stack>
      </Box>
    </>
  );
};

export default RegistrationForm;
