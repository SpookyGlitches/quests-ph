import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Link as MuiLink,
  IconButton,
  Popper,
  Fade,
  Button,
} from "@mui/material";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { format } from "date-fns";
import { useState } from "react";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import StyledPaper from "../../../../components/Common/StyledPaper";

const titleTypographyProps = {
  sx: {
    marginBottom: "0.5rem",
  },
  variant: "h5",
  fontWeight: "medium",
};

const WoopMemberStatement = ({ text, name }) => {
  return (
    <Box sx={{ marginY: "0.4rem" }}>
      <Typography variant="body1">
        {text}
        <Link href="/" passHref>
          <MuiLink sx={{ whiteSpace: "nowrap" }}> -{name}</MuiLink>
        </Link>
      </Typography>
    </Box>
  );
};

export default function Overview({ data }) {
  const [anchorWoop, setAnchorWoop] = useState(null);
  const [anchorSettings, setAnchorSettings] = useState(null);

  const [openWoopPopper, setOpenWoopPopper] = useState(false);
  const [openSettingsPopper, setOpenSettingsPopper] = useState(false);

  const handleWoopPopperClick = (event) => {
    setAnchorWoop(event.currentTarget);
    setOpenWoopPopper(!openWoopPopper);
  };

  const handleSettingsPopperClick = (event) => {
    setAnchorSettings(event.currentTarget);
    setOpenSettingsPopper(!openSettingsPopper);
  };
  const router = useRouter();
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: "2rem",
          borderRadius: 2,
          marginBottom: "1.3rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color="primary">
            Overview
          </Typography>
          <IconButton onClick={handleWoopPopperClick}>
            <MoreHorizRoundedIcon />
          </IconButton>
        </Box>

        <Stack spacing={4} sx={{ marginTop: "1rem" }}>
          <div>
            <Typography {...titleTypographyProps}>⭐ Wish</Typography>
            <Typography variant="body1">{data.wish}</Typography>
          </div>
          <div>
            <Typography {...titleTypographyProps}>🎁 Outcome</Typography>
            {data.outcome.map((item) => (
              <WoopMemberStatement
                text={item.text}
                name={item.name}
                key={item.text}
              />
            ))}
          </div>
          <div>
            <Typography {...titleTypographyProps}>🗻 Obstacle</Typography>
            {data.obstacle.map((item) => (
              <WoopMemberStatement
                text={item.text}
                name={item.name}
                key={item.text}
              />
            ))}
          </div>
          <div>
            <Typography {...titleTypographyProps}>📒 Plan</Typography>
            {data.plan.map((item) => (
              <WoopMemberStatement
                text={item.text}
                name={item.name}
                key={item.text}
              />
            ))}
          </div>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: "2rem",
          borderRadius: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            sx={{ position: "absolute", right: 0 }}
            onClick={handleSettingsPopperClick}
          >
            <MoreHorizRoundedIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Box>
                <Typography variant="body2">Category: Health</Typography>
                <Typography variant="body2">Visibility: Public</Typography>
                <Typography variant="body2">Difficulty: Hard </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box>
                <Typography variant="body2">
                  Start Date: {format(new Date(), "MMMM d, yyyy  ")}
                </Typography>
                <Typography variant="body2">
                  End Date: {format(new Date(), "MMMM d, yyyy  ")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Popper
        open={openWoopPopper}
        anchorEl={anchorWoop}
        placement="right-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <StyledPaper sx={{ paddingX: "1rem", paddingY: "0.5rem" }}>
              <Typography>Edit</Typography>
            </StyledPaper>
          </Fade>
        )}
      </Popper>
      <Popper
        open={openSettingsPopper}
        anchorEl={anchorSettings}
        placement="right-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <StyledPaper sx={{ padding: "0.25rem" }}>
              <Typography variant="body1" color="black">
                <Link
                  href={`/quests/${router.query.questId}/overview/edit-settings`}
                  passHref
                >
                  <Button>Edit Settings</Button>
                </Link>
              </Typography>
            </StyledPaper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

export async function getServerSideProps() {
  const data = {
    wish: faker.lorem.lines(1),
    outcome: [],
    obstacle: [],
    plan: [],
  };
  for (let i = 0; i < 4; i++) {
    const name = faker.name.firstName();
    data.outcome.push({
      text: faker.lorem.lines(1),
      name,
    });
    data.obstacle.push({
      text: faker.lorem.lines(1),
      name,
    });
    data.plan.push({
      text: faker.lorem.lines(2),
      name,
    });
  }

  return {
    props: {
      data,
    },
  };
}

Overview.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
