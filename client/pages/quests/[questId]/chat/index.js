import { getSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";
import QuestsChatInbox from "../../../../components/Chat/QuestsChatInbox";
import QuestsLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";

export default function QuestsChatPage({ questId }) {
  const { data, error } = useSWR(`/quests/${questId}`);
  // ^^ Query unta ni for the quest pero naay error nga 400 pirmi ^^
  const { data: userData, error: userError } = useSWR(
    `/auth/getUserCredentials`,
  );
  if (error || userError) return <p>Failed to load</p>;
  if (!data || !userData) return <CircularProgress />;

  const props = {
    questName: data.wish,
    userData,
  };
  const inboxComponent = <QuestsChatInbox {...props} />;

  return (
    <AppLayout>
      <QuestsLayout>{inboxComponent}</QuestsLayout>
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { questId } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { questId },
  };
}
