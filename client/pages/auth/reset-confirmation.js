import { Stack, Box } from "@mui/material";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/Auth/AuthHeader";
import GoBackHome from "../../components/Reset/GoBack";

export default function ResetPasswordConfirmation() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <AuthLayout>
      {message !== undefined ? (
        <>
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
        </>
      ) : (
        <>
          <AuthHeader subtitle="You seem to be lost." />
          <GoBackHome />
        </>
      )}
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
