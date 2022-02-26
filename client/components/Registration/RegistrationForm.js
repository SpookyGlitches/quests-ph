import * as React from 'react';
import Link from 'next/link';
import {
  Typography,
  Box,
  Button,
  StepLabel,
  Step,
  Stepper,
  Link as MuiLink,
} from '@mui/material';
import MemberRegistrationOne from './MemberRegistrationOne';
import MemberRegistrationTwo from './MemberRegistrationTwo';
import MemberRegistrationThree from './MemberRegistrationThree';

const steps = ['', ''];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (!myForm.current.checkValidity()) {
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const myForm = React.useRef(null);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MemberRegistrationOne />;
      case 1:
        return <MemberRegistrationTwo />;
      default:
        return 'Unknown step';
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ mt: '-1rem' }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <form action="/" method="POST" ref={myForm}>
        {activeStep === steps.length ? (
          // If all entries are correct or validation has finished without any error, proceed to this
          <MemberRegistrationThree />
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {getStepContent(activeStep)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </form>
    </Box>
  );
}
