export default function Index() {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>Hello</>;
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
