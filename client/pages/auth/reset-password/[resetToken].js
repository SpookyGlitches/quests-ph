import React, { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import { resetUserPassword } from "../../../validations/ResetPassword";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import prisma from "../../../lib/prisma";
import FilledOut from "../../../components/Reset/FilledOut";
import LinkExpired from "../../../components/Reset/LinkExpired";
import GoBackHome from "../../../components/Reset/GoBack";

export default function Reset({ data }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const currentValidationSchema = resetUserPassword[1];
  const formOptions = { resolver: yupResolver(currentValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (values) => {
    const userDetails = {
      userId: data.userId,
      forgotPasswordId: data.forgotPasswordId,
      password: values.password,
    };
    axios({
      method: "POST",
      url: "/api/auth/updatepassword",
      data: {
        userDetails,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Router.push(
            {
              pathname: "/auth/reset-confirmation",
              query: {
                message: "You have successfully updated your password!",
              },
            },
            "/auth/reset-confirmation",
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (data !== null) {
    // check if link is still valid
    let flag = 0;
    const timeFromDb = JSON.stringify(data.createdAt);
    const removedQuote = timeFromDb.replace(/['"]+/g, "");
    const time = new Date();
    const currentTime = time.toISOString();
    const current = new Date(currentTime);
    const dbTime = new Date(removedQuote);
    const hourDiff = current - dbTime; // in ms
    const minDiff = hourDiff / 60 / 1000; // in minutes
    if (minDiff > 5) {
      // 5 mins has passed
      flag = 1;
    }
    // check if time is valid and link hasnt been used
    if (flag === 0 && data.isUsed === false) {
      return (
        <AuthLayout>
          <AuthHeader subtitle="Reset your password" />
          <Stack direction="column" spacing={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                name="password"
                style={{}}
                id="filled-required"
                label="Password"
                sx={{ mb: 2 }}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors.password && errors.password.message}
                helperText={errors.password ? errors.password.message : ""}
                {...register("password")}
              />
              <TextField
                fullWidth
                name="confirmPassword"
                style={{}}
                id="filled-required"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors.confirmPassword && errors.confirmPassword.message}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                {...register("confirmPassword")}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Stack>
        </AuthLayout>
      );
    }
    if (flag === 1) {
      return <LinkExpired />;
    }
    if (data.isUsed === true) {
      return <FilledOut />;
    }
  } else {
    return (
      <AuthLayout>
        <AuthHeader subtitle="You seem to be lost." />
        <GoBackHome />
      </AuthLayout>
    );
  }
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req });
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

  const findAccount = await prisma.forgotPassword.findFirst({
    where: {
      token: params.resetToken,
    },
  });
  const data = JSON.parse(JSON.stringify(findAccount));

  return { props: { data } };
}
