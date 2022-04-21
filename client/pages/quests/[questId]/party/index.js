import { useRouter } from "next/router";
import useSWR from "swr";
import { Stack } from "@mui/material";
import PartyList from "../../../../components/Quest/Party/PartyList";
import BanList from "../../../../components/Quest/Party/BanList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";

export default function PartyPage() {
  const { query } = useRouter();
  const { questId } = query;
  const { data: partyMember } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );

  return (
    <Stack spacing={2}>
      <PartyList />
      {partyMember && partyMember.role === "PARTY_LEADER" && <BanList />}
    </Stack>
  );
}

PartyPage.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
