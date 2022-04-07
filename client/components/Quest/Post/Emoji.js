import Party from "../../Icons/Emojis/Party";
import Crying from "../../Icons/Emojis/Crying";
import Laugh from "../../Icons/Emojis/Laugh";
import Sad from "../../Icons/Emojis/Sad";
import Surprised from "../../Icons/Emojis/Surprised";

export default function Emoji({ type, ...rest }) {
  const renderEmoji = (emojiType) => {
    switch (emojiType) {
      case "LAUGH":
        return <Laugh {...rest} />;
      case "SURPRISED":
        return <Surprised {...rest} />;
      case "CRYING":
        return <Crying {...rest} />;
      case "PARTY":
        return <Party {...rest} />;
      case "SAD":
        return <Sad {...rest} />;
      default:
        return null;
    }
  };
  return renderEmoji(type);
}
