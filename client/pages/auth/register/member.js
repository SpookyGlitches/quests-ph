// import MemberRegistrationForm from "../../../components/Registration/MemberRegistrationForm";
import { Box, StepLabel, Stack, Stepper, Button, Step } from "@mui/material";
import { useState } from "react";
// eslint-disable-next-line
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import Step1 from "../../../components/Registration/Step1";
import Step2 from "../../../components/Registration/Step2";
import { registerUserValidation } from "../../../validations/UserRegistration";
import SignUpDisclaimer from "../../../components/Registration/SignUpDisclaimer";

const steps = ["", ""];
export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  // eslint-disable-next-line no-undef
  const currentValidationSchema = registerUserValidation[activeStep];

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
    },
  });

  const { trigger, handleSubmit, control } = methods;

  // const here = (values) => {
  const here = async (values) => {
    // console.log(values);

    try {
      const rawDate = values.dateOfBirth;
      const dateObj = new Date(rawDate);
      const bdate = dateObj.toISOString();
      const userDeets = {
        email: values.email,
        dateOfBirth: bdate,
        displayName: values.displayName,
        fullName: values.fullName,
        password: values.password,
        role: "member",
      };
      // console.log("ezez");
      // console.log(userDeets);
      const res = await fetch("/api/accounts", {
        method: "POST",
        body: JSON.stringify(userDeets),
      });
      if (res.status === 200) {
        console.log("yes");
      } else {
        console.log("no");
        //   //   //throw new Error(res.text());
      }
    } catch (err) {
      console.log("Error!");
    }
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
    <AuthLayout>
      <AuthHeader subtitle="Create an account" />
      {/* <MemberRegistrationForm /> */}
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
              <Step1 control={control} memberType="member" />
            ) : (
              <Step2 />
            )}
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
            fullWidth
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
          {activeStep === steps.length - 1 ? <SignUpDisclaimer /> : ""}
        </Stack>
      </Box>
    </AuthLayout>
  );
}
