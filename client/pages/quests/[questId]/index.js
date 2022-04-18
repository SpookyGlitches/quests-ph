export default function Index() {
  return null;
}

export async function getServerSideProps(context) {
  const { questId } = context.query;
  return {
    redirect: {
      permanent: true,
      destination: `/quests/${questId}/posts`,
    },
  };
}
