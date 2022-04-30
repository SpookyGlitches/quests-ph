import { useState } from "react";
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
import axios from "axios";
import { useSnackbar } from "notistack";
import useSWR, { mutate } from "swr";
import Link from "next/link";

export default function Reminders() {
  const { enqueueSnackbar } = useSnackbar();
  const [flag, setFlag] = useState(false);
  const { data: suggestions } = useSWR("/profile/suggestions");
  const [status, setStatus] = useState("Add Friend");

  const handleAdd = (userId) => {
    axios({
      method: "get",
      url: `/api/profile/${userId}/checkrequest`,
      data: {
        userId,
      },
    })
      .then((response) => {
        if (response.data.length !== 1) {
          setFlag(false);
          axios({
            method: "POST",
            url: `/api/profile/${userId}/addafriend`,
            data: {
              userId,
            },
          })
            .then(() => {
              enqueueSnackbar("You have successfully sent a friend request!");
              mutate(`/api/profile/${userId}/checkrequest`);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setFlag(true);
          enqueueSnackbar(
            "There is an existing request for this user. Please check your incoming/outgoing requests.",
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(suggestions);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 1,
        paddingY: "1rem",
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
      {suggestions?.map((item) => (
        <List
          key={item.userId}
          //   sx={{
          //     "&.MuiList-root": {
          //       padding: 0,
          //       margin: 0,
          //     },
          //   }}
          //   sx={{
          //     width: "100%",
          //     maxWidth: 360,
          //   }}
        >
          <ListItem
            button
            secondaryAction={
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAdd(item.userId)}
              >
                {flag ? "Pending" : "Add Friend"}
              </Button>
            }
            disablePadding
          >
            <Link href={`/profile/${item.userId}`} passHref>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar src={`/static/images/avatar/${2 + 1}.jpg`} />
                </ListItemAvatar>
                <ListItemText>{item.displayName}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      ))}
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
