import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Settings from "../../../../components/Quest/Overview/Settings";
import Statements from "../../../../components/Quest/Overview/Statements";

export default function Overview() {
  return (
    <div>
      <Statements />
      <Settings />
    </div>
  );
}

Overview.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
