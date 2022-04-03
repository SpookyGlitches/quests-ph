import { Stack, Box } from "@mui/material";
import { useRouter } from "next/router";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/Auth/AuthHeader";
import GoBackHome from "../../components/Reset/GoBack";

export default function ResetPasswordConfirmation() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <AuthLayout>
      <AuthHeader subtitle="Reset your password" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="column" spacing={2}>
          <h3>{message}</h3>
        </Stack>
      </Box>
      <GoBackHome />
    </AuthLayout>
  );
}
