import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  List,
  ListItem,
  Avatar,
  Button,
  ListItemAvatar,
  Select,
  Divider,
  ListItemButton,
  ListItemText,
  Checkbox,
  Stack,
  FormGroup,
  FormControlLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";
import useSWR from "swr";

import { formatRelative, subDays } from "date-fns";
import Link from "next/link";

export default function Reminders() {
  const [selectedValue, setSelectedValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const { data: quests, error } = useSWR("/quests?status=ACTIVE");

  useEffect(() => {
    if (quests) {
      setSelectedValue(quests.length <= 0 ? -1 : quests[0].questId);
    }
  }, [quests]);

  const { data: getSpecificTasks } = useSWR(
    selectedValue && quests ? `/quests/${selectedValue}/tasks` : null,
  );

  if (!quests) return <CircularProgress />;

  console.log(getSpecificTasks);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 1,
        height: "300px",

        paddingY: "1rem",
      }}
    >
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
      >
        <Typography
          sx={{
            marginLeft: "15px",
            marginBottom: "10px",
            color: "#755CDE",
            fontWeight: "medium",
            fontSize: "18px",
          }}
        >
          People You May Know
        </Typography>
        <ListItem
          button
          secondaryAction={
            <Button variant="outlined" size="small">
              Add Friend
            </Button>
          }
          disablePadding
          sx={{ marginBottom: 1.5 }}
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={`/static/images/avatar/${2 + 1}.jpg`} />
            </ListItemAvatar>
            <ListItemText primary="Monica Barr" />
          </ListItemButton>
        </ListItem>
        <ListItem
          button
          secondaryAction={
            <Button variant="outlined" size="small">
              Add Friend
            </Button>
          }
          disablePadding
          sx={{ marginBottom: 1.5 }}
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={`/static/images/avatar/${2 + 1}.jpg`} />
            </ListItemAvatar>
            <ListItemText primary="Earl Augusto" />
          </ListItemButton>
        </ListItem>
        <ListItem
          button
          secondaryAction={
            <Button variant="outlined" size="small">
              Add Friend
            </Button>
          }
          disablePadding
          sx={{ marginBottom: 1.5 }}
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={`/static/images/avatar/${2 + 1}.jpg`} />
            </ListItemAvatar>
            <ListItemText primary="RJ Fajardo" />
          </ListItemButton>
        </ListItem>
        <ListItem
          button
          secondaryAction={
            <Button variant="outlined" size="small">
              Add Friend
            </Button>
          }
          disablePadding
          sx={{ marginBottom: 1.5 }}
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={`/static/images/avatar/${2 + 1}.jpg`} />
            </ListItemAvatar>
            <ListItemText primary="Jerby Pardo" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/landing",
      },
    };
  }

  return {
    props: {},
  };
}
