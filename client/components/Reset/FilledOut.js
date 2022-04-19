import Link from "next/link";
import { Typography, Link as MuiLink } from "@mui/material";
import AuthLayout from "../Layouts/AuthLayout";
import AuthHeader from "../Auth/AuthHeader";

export default function Filled() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="You have filled out this form already." />
      <Typography>
        {/* eslint-disable-next-line */}
        Didn't receive any email? Request for another password reset
        <Link href="/auth/reset" passHref>
          <MuiLink sx={{ cursor: "pointer" }}> here</MuiLink>
        </Link>
      </Typography>
    </AuthLayout>
  );
}
