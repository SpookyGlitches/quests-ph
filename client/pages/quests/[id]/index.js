import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/quests/1/posts");
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
