import Link from "next/link";
import { Typography, Link as MuiLink } from "@mui/material";
import AuthLayout from "../Layouts/AuthLayout";
import AuthHeader from "../Auth/AuthHeader";

export default function Filled() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="Your link has expired" />
      <Typography>
        Request for a new one{" "}
        <Link href="/auth/reset" passHref>
          <MuiLink sx={{ cursor: "pointer" }}>here</MuiLink>
        </Link>
      </Typography>
    </AuthLayout>
  );
}
