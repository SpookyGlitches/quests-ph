import * as React from "react";
import { Box, StepLabel, Stack, Stepper, Button, Step } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// eslint-disable-next-line
import Router from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import Step1 from "../../../components/Registration/Step1";
import Step2 from "../../../components/Registration/Step2";
import Step3 from "../../../components/Registration/Step3";
import Step4 from "../../../components/Registration/Step4";
import { MentorRegistration } from "../../../validations/MentorRegistration";
import SignUpDisclaimer from "../../../components/Registration/SignUpDisclaimer";
import HaveAnAccount from "../../../components/Registration/HaveAnAccount";
import DocumentTitle from "../../../components/Common/DocumentTitle";

const steps = ["", "", "", ""];

const MentorRegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [keyArr, setKeyArr] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
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
      grade: "",
      yearlevel: "",
      course: "",
    },
  });

  const { trigger, handleSubmit, control } = methods;
  const here = async (values) => {
    try {
      await axios({
        method: "POST",
        url: "/api/auth/mentoraccounts",
        data: {
          values,
          uploadedFiles,
          keyArr,
        },
      }).then(() => {
        Router.push({
          pathname: "/auth/verify-email/[emailAddress]",
          query: { emailAddress: values.email },
        });
      });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          setMessage("Display Name is already in use.");
          setShow(true);
        } else if (err.response.status === 409) {
          console.log("email");
          setMessage("Email address is already in use.");
          setShow(true);
        } else if (err.response.status === 400) {
          console.log("both");
          setMessage("Display Name and Email Address are already in use.");
          setShow(true);
        }
      }
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
      <DocumentTitle title="Quests" />
      <AuthHeader subtitle="Create an account" />
      {!show ? (
        ""
      ) : (
        <Alert variant="outlined" severity="error">
          {message}
        </Alert>
      )}
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
        <>{console.log("")}</>
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
            {activeStep === 3 ? (
              <Step4
                control={control}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                keyArr={keyArr}
                setKeyArr={setKeyArr}
                setIsFinished={setIsFinished}
              />
            ) : null}
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
            disabled={isFinished}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
          {activeStep === steps.length - 1 ? <SignUpDisclaimer /> : ""}
        </Stack>
      </Box>
      <HaveAnAccount />
    </AuthLayout>
  );
};

export default MentorRegistrationForm;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    if (session.user.role !== "admin") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
