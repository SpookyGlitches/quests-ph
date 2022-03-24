import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/Auth/AuthHeader";
import { resetUserPassword } from "../../validations/ResetPassword";

export default function ResetPassword() {
  // eslint-disable-next-line no-undef
  const currentValidationSchema = resetUserPassword[0];
  const formOptions = { resolver: yupResolver(currentValidationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = (data) => {
    // console.log(data.email);
    // eslint-disable-next-line
    try {
      // eslint-disable-next-line
      const res = fetch("/api/auth/resetpassword", {
        method: "POST",
        body: JSON.stringify(data),
      });

      // if (res.status === 200) {
      //   Router.push({
      //     pathname: "/auth/verify-email/[emailAddress]",
      //     query: { emailAddress: values.email },
      //   });
      // } else if (res.status === 403) {
      //   setMessage("Display Name is already in use.");
      //   setShow(true);
      // } else if (res.status === 409) {
      //   console.log("email");
      //   setMessage("Email address is already in use.");
      //   setShow(true);
      // } else if (res.status === 400) {
      //   console.log("both");
      //   setMessage("Display Name and Email Address are already in use.");
      //   setShow(true);
      // }
    } catch (err) {
      throw err;
    }
  };
  return (
    <AuthLayout>
      <AuthHeader subtitle="Reset your password" />

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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="string" align="center">
          Not yet registered?{" "}
          <Link href="/" passHref>
            <MuiLink sx={{ cursor: "pointer" }}>Create an account</MuiLink>
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
