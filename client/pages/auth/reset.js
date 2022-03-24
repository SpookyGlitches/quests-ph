import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const [message, setMessage] = useState("");
  const onSubmit = (data) => {
    // eslint-disable-next-line
    try {
      // eslint-disable-next-line
      const res = fetch("/api/auth/resetpassword", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          setMessage("We have sent a reset password link to your email.");
        } else {
          setMessage("Your email doesn't exist.");
        }
      });
    } catch (err) {
      throw err;
    }
  };
  return (
    <AuthLayout>
      <AuthHeader subtitle="Reset your password" />
      {message !== "" ? (
        <Alert severity="success" color="primary">
          {message}
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
