import { Box, Typography, Tabs, Tab } from "@mui/material";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

const muiLinkProps = {
  component: "button",
  variant: "body2",
};
import { useRouter } from "next/router";

const getLinkStyles = (routerAsPath, basePath, tab) => {
  return {
    fontWeight: routerAsPath.startsWith(`${basePath}/${tab}`) ? "bold" : "",
  };
};

export default function QuestHeader() {
  const router = useRouter();
  const basePath = `/quests/${router.query.id}`;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.paper",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "1.5rem",
        paddingBottom: "0.6rem",
        flex: 1,
        maxHeight: "20rem",
        gap: 2,
        borderRadius: 2,
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
        <Typography component="div" variant="body2">
          Health
        </Typography>
        <Box sx={{ marginTop: "0.2rem" }}>
          <Typography variant="h4" align="center">
            Run 5 km daily for 3 months
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
        <Link href={`${basePath}/overview`} passHref>
          <MuiLink
            {...muiLinkProps}
            sx={getLinkStyles(router.asPath, basePath, "overview")}
          >
            Overview
          </MuiLink>
        </Link>
        <Link href={`${basePath}/posts`} passHref>
          <MuiLink
            {...muiLinkProps}
            sx={getLinkStyles(router.asPath, basePath, "posts")}
          >
            Posts
          </MuiLink>
        </Link>
        <Link href={`${basePath}/tasks`} passHref>
          <MuiLink
            {...muiLinkProps}
            sx={getLinkStyles(router.asPath, basePath, "tasks")}
          >
            Tasks
          </MuiLink>
        </Link>
        <Link href={`${basePath}/party`} href="/" passHref>
          <MuiLink
            {...muiLinkProps}
            sx={getLinkStyles(router.asPath, basePath, "party")}
          >
            Party
          </MuiLink>
        </Link>
        <Link href={`${basePath}/wiki`} passHref>
          <MuiLink
            {...muiLinkProps}
            sx={getLinkStyles(router.asPath, basePath, "wiki")}
          >
            Wiki
          </MuiLink>
        </Link>
        <Link href={`${basePath}/chat`} passHref>
          <MuiLink
            {...muiLinkProps}
            sx={getLinkStyles(router.asPath, basePath, "chat")}
          >
            Chat
          </MuiLink>
        </Link>
      </Box>
    </Box>
  );
}
