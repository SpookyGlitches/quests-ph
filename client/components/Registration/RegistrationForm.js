import * as React from "react";
import { Box, StepLabel, Step, Stepper } from "@mui/material";
import MemberRegistrationOne from "./MemberRegistrationOne";
import MemberRegistrationTwo from "./MemberRegistrationTwo";
import MemberRegistrationThree from "./MemberRegistrationThree";

const steps = ["", ""];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <MemberRegistrationOne
            handleNext={handleNext}
            activeStep={activeStep}
            steps={step}
          />
        );
      case 1:
        return (
          <MemberRegistrationTwo
            handleNext={handleNext}
            activeStep={activeStep}
            steps={step}
            handleBack={handleBack}
          />
        );
      default:
        return "Unknown step";
    }
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{}}>
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
      <>
        {activeStep === steps.length ? (
          <MemberRegistrationThree />
        ) : (
          <div>{getStepContent(activeStep)}</div>
        )}
      </>
    </Box>
  );
}
