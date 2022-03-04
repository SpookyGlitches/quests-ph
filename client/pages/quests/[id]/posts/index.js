import { faker } from "@faker-js/faker";
import PostsList from "../../../../components/Quest/Post/PostsList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";

const Index = ({ data }) => {
  return (
    <QuestLayout>
      <div>
        <PostsList posts={data} />
      </div>
    </QuestLayout>
  );
};
export default Index;
export async function getServerSideProps() {
  // should be getstatic pero noo
  const data = [];
  for (var i = 0; i < 5; i++) {
    const rand = Math.floor(Math.random() * 3);
    const images = [...Array(rand)].map(() =>
      faker.image.people(null, null, true),
    );
    data.push({
      username: faker.name.firstName(),
      title: faker.lorem.lines(2),
      createdAt: JSON.stringify(faker.date.recent()),
      body: faker.lorem.lines(30),
      images: images,
    });
  }
  return {
    props: {
      data,
    },
  };
}
