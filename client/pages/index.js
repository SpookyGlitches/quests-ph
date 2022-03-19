import { Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import AppLayout from "../components/Layouts/AppLayout";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session", session);
  if (session) {
    return (
      <AppLayout>
        Signed in as {session.user.email} <br />
        Signed in as {session.user.displayName} <br />
        You are a {session.user.role} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </AppLayout>
    );
  }
  return (
    <>
      landing page ~ not signed in <br />
      <Button onClick={() => signOut()}>Sign out</Button>
      <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
    </>
  );
}
