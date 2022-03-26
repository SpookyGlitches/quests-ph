import CreatePost from "../../../../components/Quest/Post/CreatePost";
import QuestLayout from "../../../../components/Layouts/QuestLayout";

export default function Create() {
  return <CreatePost />;
}

Create.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
