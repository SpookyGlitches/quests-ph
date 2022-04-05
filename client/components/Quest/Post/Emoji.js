import Party from "../../Icons/Emojis/Party";
import Crying from "../../Icons/Emojis/Crying";
import Laugh from "../../Icons/Emojis/Laugh";
import Sad from "../../Icons/Emojis/Sad";
import Surprised from "../../Icons/Emojis/Surprised";

const emojiProps = {
  style: { cursor: "pointer" },
};

export default function Emoji({ type, ...rest }) {
  const renderEmoji = (emojiType) => {
    switch (emojiType) {
      case "LAUGH":
        return <Laugh {...emojiProps} {...rest} />;
      case "SURPRISED":
        return <Surprised {...emojiProps} {...rest} />;
      case "CRYING":
        return <Crying {...emojiProps} {...rest} />;
      case "PARTY":
        return <Party {...emojiProps} {...rest} />;
      case "SAD":
        return <Sad {...emojiProps} {...rest} />;
      default:
        return null;
    }
  };
  return renderEmoji(type);
}
