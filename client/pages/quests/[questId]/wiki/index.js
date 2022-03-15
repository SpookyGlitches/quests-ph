import QuestLayout from "../../../../components/Layouts/QuestLayout";
import Wiki from "../../../../components/Quest/Wiki/Wiki";

const Index = () => {
  return <Wiki />;
};
export default Index;

Index.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};

// export async function getServerSideProps(context) {
//   try {
//     const { data: quest } = await axios.get(
//       `http://localhost:3000/api/quests/${context.params.questId}`,
//     );
//     return {
//       props: {
//         data: quest,
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }
