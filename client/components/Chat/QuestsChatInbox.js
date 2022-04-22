import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import Talk from "talkjs";

export default function InboxComponent(data) {
  const talkjsContainer = React.createRef();
  // const { data: sessionUser } = useSession();
  console.log(data);
  useEffect(() => {
    // eslint-disable-next-line
    const currentUser = data.userData;

    Talk.ready.then(() => {
      const me = new Talk.User({
        id: currentUser.userId,
        name: currentUser.displayName,
        fullname: currentUser.fullName,
        role: currentUser.role,
      });
      console.log(me);
      const session = new Talk.Session({
        appId: "tvcbUw3n",
        me,
      });

      const conversation = session.getOrCreateConversation(
        // eslint-disable-next-line
        `${data.questId}QuestChat`,
      );
      console.log(conversation);
      conversation.setParticipant(me);
      conversation.setAttributes({
        // eslint-disable-next-line
        subject: `${data.questName} Chatroom`,
      });
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(talkjsContainer.current);
    });
  }, []);

  return (
    <div
      ref={talkjsContainer}
      className="chatbox-container"
      style={{ height: 400 }}
    />
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
