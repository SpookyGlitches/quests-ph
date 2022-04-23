import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/Auth/AuthHeader";
import { resetUserPassword } from "../../validations/ResetPassword";
import CreateAnAccount from "../../components/Registration/CreateAnAccount";

export default function ResetPassword() {
  // eslint-disable-next-line no-undef
  const currentValidationSchema = resetUserPassword[0];
  const formOptions = { resolver: yupResolver(currentValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = (data) => {
    axios({
      method: "POST",
      url: "/api/auth/sendresetpassword",
      data: {
        data,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Router.push(
            {
              pathname: "/auth/reset-confirmation",
              query: {
                message: "Please check your email for more details.",
              },
            },
            "/auth/reset-confirmation",
          );
        }
      })
      .catch((error) => {
        setErrorMessage("Your email doesn't exist.");
        console.log(error);
      });
  };
  return (
    <AuthLayout>
      <AuthHeader subtitle="Reset your password" />
      {errorMessage !== "" ? (
        <Alert severity="error" color="error">
          {errorMessage}
        </Alert>
      ) : (
        ""
      )}
      <Stack direction="column" spacing={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            name="email"
            style={{}}
            id="filled-required"
            label="Email Address"
            error={errors.email && errors.email.message}
            helperText={errors.email ? errors.email.message : ""}
            {...register("email")}
          />
          <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
            Reset Password
          </Button>
        </form>
      </Stack>
      <CreateAnAccount />
    </AuthLayout>
  );
}

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
