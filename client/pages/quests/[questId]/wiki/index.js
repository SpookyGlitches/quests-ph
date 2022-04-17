import AppLayout from "../../../../components/Layouts/AppLayout";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Wiki from "../../../../components/Quest/Wiki/Wiki";

export default function Index() {
  return <Wiki />;
}

Index.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
