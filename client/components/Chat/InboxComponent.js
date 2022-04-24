import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import Talk from "talkjs";

export default function InboxComponent(data) {
  const talkjsContainer = React.createRef();
  let other;
  useEffect(() => {
    // eslint-disable-next-line
    const currentUser = data.userCred;
    Talk.ready.then(() => {
      const me = new Talk.User({
        id: currentUser.userId,
        name: currentUser.displayName,
        fullname: currentUser.fullName,
        role: currentUser.role,
      });

      const session = new Talk.Session({
        appId: "tvcbUw3n",
        me,
      });
      // eslint-disable-next-line
      if (data.otherUser.length !== 0) {
        // eslint-disable-next-line
        other = new Talk.User({
          // eslint-disable-next-line
          id: data.otherUser.userId,
          // eslint-disable-next-line
          name: data.otherUser.displayName,
          // eslint-disable-next-line
          fullname: data.otherUser.fullName,
          // eslint-disable-next-line
          role: data.otherUser.role,
        });

        const conversation = session.getOrCreateConversation(
          Talk.oneOnOneId(me, other),
        );

        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const inbox = session.createInbox({ selected: conversation });
        inbox.mount(talkjsContainer.current);
      } else {
        other = new Talk.User({
          id: "questAdmin",
          name: "Quest Guide",
          fullname: "Quest Guide",
          email: "quests@gmail.com",
          welcomeMessage: "Hey there! How are you? :-) Welcom to Quests Chat.",
          role: "member",
        });
        const conversation = session.getOrCreateConversation(
          Talk.oneOnOneId(me, other),
        );
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        const inbox = session.createInbox();
        inbox.mount(talkjsContainer.current);
      }
    });
    // eslint-disable-next-line
  }, [data.otherUser]);

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
