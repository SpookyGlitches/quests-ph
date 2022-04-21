import { Box, Typography, Link as MuiLink, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { QuestContext } from "../../context/QuestContext";
import capitalizeFirstLetterOnly from "../../helpers/strings";
import Category from "../Icons/Category";

const muiLinkProps = {
  component: "button",
  variant: "body2",
  color: "black",
};

const getLinkStyles = (routerAsPath, basePath, tab) => {
  const isActive = routerAsPath.startsWith(`${basePath}/${tab}`);
  return {
    fontWeight: isActive ? "bold" : "",
    color: isActive ? "primary.main" : "",
    "&:hover": {
      color: "primary.main",
    },
  };
};

const tabs = ["Overview", "Posts", "Tasks", "Party", "Wiki", "Chat"];

export default function QuestHeader() {
  const router = useRouter();
  const { questId } = router.query;
  const basePath = `/quests/${questId}`;
  const quest = useContext(QuestContext);

  return (
    <Paper
      sx={{
        display: "flex",
        backgroundColor: "background.paper",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        py: 3,
        px: 1,
        gap: 2,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Category category={quest.category} />
          <Typography variant="body2" sx={{ fontWeight: "regular" }}>
            {capitalizeFirstLetterOnly(quest.category)}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="h5" align="center" color="primary">
            {quest.wish}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
          justifyContent: "center",
          rowGap: 1,
        }}
      >
        {tabs.map((item) => {
          const lower = item.toLowerCase();
          return (
            <Link href={`${basePath}/${lower}`} passHref key={item}>
              <MuiLink
                {...muiLinkProps}
                sx={getLinkStyles(router.asPath, basePath, lower)}
              >
                {item}
              </MuiLink>
            </Link>
          );
        })}
      </Box>
    </Paper>
  );
}
