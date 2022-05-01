import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { getSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import CustomAvatar from "./CustomAvatar";

export default function Reminders() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: suggestions } = useSWR("/profile/suggestions");

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
          enqueueSnackbar(
            "There is an existing request for this user. Please check your incoming/outgoing requests.",
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if (!suggestions) return <CustomCircularProgress />;

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
        <List key={item.userId}>
          <ListItem
            button
            secondaryAction={
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAdd(item.userId)}
              >
                Add Friend
              </Button>
            }
            disablePadding
          >
            <Link href={`/profile/${item.userId}`} passHref>
              <ListItemButton>
                <ListItemAvatar>
                  <CustomAvatar
                    displayName={item.displayName}
                    image={item.image}
                  />
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
