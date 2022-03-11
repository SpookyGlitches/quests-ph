import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

const muiLinkProps = {
  component: "button",
  variant: "body2",
  color: "black",
};
import { useRouter } from "next/router";

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
  const basePath = `/quests/${router.query.id}`;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.paper",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "2rem",
        paddingBottom: "1rem",
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
          <Typography variant="h4" align="center" color="primary">
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
        {tabs.map((item, index) => {
          const lower = item.toLowerCase();
          return (
            <Link href={`${basePath}/${lower}`} passHref key={index}>
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
    </Box>
  );
}
