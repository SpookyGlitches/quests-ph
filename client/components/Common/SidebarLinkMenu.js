import Link from "next/link";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { alpha } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

function getItemButtonStyles(path, routerPath) {
  // const activeStyle = { backgroundColor: "green" };
  const activeStyle = {
    "& .MuiListItemIcon-root": {
      color: "primary.main",
    },
    "& .MuiListItemText-root": {
      color: "primary.main",
    },
    "& .MuiTypography-root": {
      fontWeight: "bold",
    },
    backgroundColor: ({
      palette: {
        primary: { main },
      },
    }) => alpha(main, 0.1),
  };
  if (path === routerPath && path === "/") {
    return activeStyle;
  }
  if (routerPath.startsWith(path) && path !== "/") {
    return activeStyle;
  }
  return {};
}

export default function SidebarLinkMenu({ path, label, routerPathName }) {
  const renderIcon = (text) => {
    switch (text) {
      case "Home":
        return <HomeRoundedIcon />;
      case "Quests":
        return <MapRoundedIcon />;
      case "Requests":
        return <ConnectWithoutContactRoundedIcon />;
      case "Articles":
        return <ArticleRoundedIcon />;
      case "Friends":
        return <PeopleRoundedIcon />;
      case "Chats":
        return <ChatRoundedIcon />;
      case "Profile":
        return <AccountCircleRoundedIcon />;
      case "Badges":
        return <MilitaryTechRoundedIcon />;
      case "Users":
        return <PersonRoundedIcon />;
      case "Applications":
        return <InsertDriveFileRoundedIcon />;
      case "Reports":
        return <WarningRoundedIcon />;
      default:
        return null;
    }
  };

  return (
    <Link href={path} passHref>
      <ListItemButton
        component="a"
        sx={getItemButtonStyles(path, routerPathName)}
      >
        <ListItemIcon>{renderIcon(label)}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </Link>
  );
}
