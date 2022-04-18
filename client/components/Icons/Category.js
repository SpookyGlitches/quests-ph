import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import getCategoryColor from "../../helpers/categoryColor";

export default function Category({ category, rootStyles, rest }) {
  const renderIcon = () => {
    const color = getCategoryColor(category);
    switch (category) {
      case "HEALTH":
        return (
          <HealthAndSafetyRoundedIcon sx={{ color, ...rootStyles }} {...rest} />
        );
      case "CAREER":
        return <WorkRoundedIcon sx={{ color, ...rootStyles }} {...rest} />;
      case "SOCIAL":
        return <GroupsRoundedIcon sx={{ color, ...rootStyles }} {...rest} />;
      default:
        return null;
    }
  };
  return renderIcon();
}
