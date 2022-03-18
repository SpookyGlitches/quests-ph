import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Wiki from "../../../../components/Quest/Wiki/Wiki";

const Index = () => {
  return <Wiki />;
};
export default Index;

Index.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
