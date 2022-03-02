import { useRouter } from "next/router";
import { useEffect } from "react";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { faker } from "@faker-js/faker";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { format } from "date-fns";

export default function Overview({ data }) {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query);
  });

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
            <MuiLink sx={{ whiteSpace: "nowrap" }}> - {name}</MuiLink>
          </Link>
        </Typography>
      </Box>
    );
  };
  return (
    <QuestLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          paddingX: "2rem",
          paddingY: "3rem",
          borderRadius: 2,
          marginBottom: "1.3rem",
        }}
      >
        <Stack spacing={4}>
          <Box sx={{ position: "relative" }}>
            <IconButton sx={{ position: "absolute", right: 0 }}>
              <MoreHorizRoundedIcon />
            </IconButton>
            <Typography {...titleTypographyProps}>⭐ Wish</Typography>
            <Typography variant="body1">{data.wish}</Typography>
          </Box>
          <div>
            <Typography {...titleTypographyProps}>🎁 Outcome</Typography>
            {data.outcome.map((item, index) => (
              <WoopMemberStatement
                text={item.text}
                name={item.name}
                key={index}
              />
            ))}
          </div>
          <div>
            <Typography {...titleTypographyProps}>🗻 Obstacle</Typography>
            {data.obstacle.map((item, index) => (
              <WoopMemberStatement
                text={item.text}
                name={item.name}
                key={index}
              />
            ))}
          </div>
          <div>
            <Typography {...titleTypographyProps}>📒 Plan</Typography>
            {data.plan.map((item, index) => (
              <WoopMemberStatement
                text={item.text}
                name={item.name}
                key={index}
              />
            ))}
          </div>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          paddingX: "2rem",
          paddingY: "3rem",
          borderRadius: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton sx={{ position: "absolute", right: 0 }}>
            <MoreHorizRoundedIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Box>
                <Typography>Category: Health</Typography>
                <Typography>Visibility: Public</Typography>
                <Typography>Difficulty: Hard </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box>
                <Typography>
                  Start Date: {format(new Date(), "MMMM d, yyyy  ")}{" "}
                </Typography>
                <Typography>
                  End Date: {format(new Date(), "MMMM d, yyyy  ")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </QuestLayout>
  );
}

export async function getServerSideProps() {
  const data = {
    wish: faker.lorem.lines(1),
    outcome: [],
    obstacle: [],
    plan: [],
  };
  for (var i = 0; i < 4; i++) {
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
