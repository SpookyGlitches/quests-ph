import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Talk from "talkjs";

export default function InboxComponent({ otherUser }) {
  const talkjsContainer = React.createRef();
  const { data: sessionUser } = useSession();
  let other;
  useEffect(() => {
    const currentUser = sessionUser;
    Talk.ready.then(() => {
      const me = new Talk.User({
        id: currentUser.user.userId,
        name: currentUser.user.displayName,
        fullname: currentUser.user.fullName,
        role: currentUser.user.role,
      });

      const session = new Talk.Session({
        appId: "tvcbUw3n",
        me,
      });
      if (otherUser.length !== 0) {
        other = new Talk.User({
          id: otherUser.userId,
          name: otherUser.displayName,
          fullname: otherUser.fullName,
          role: otherUser.role,
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
  }, [otherUser]);

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
