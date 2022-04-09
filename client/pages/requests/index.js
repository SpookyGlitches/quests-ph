import { useSession } from "next-auth/react";
import AppLayout from "../../components/Layouts/AppLayout";
import AccessDenied from "../../components/Error/AccessDenied";

export default function RequestsPage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <AppLayout>
        <h1>hello req</h1>
      </AppLayout>
    );
  }
  return <AccessDenied />;
}
