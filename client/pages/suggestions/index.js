import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import axios from "axios";
import { useSnackbar } from "notistack";

import useSWR, { mutate } from "swr";
import Link from "next/link";
import AppLayout from "../../components/Layouts/AppLayout";
import CustomAvatar from "../../components/Common/CustomAvatar";
import SuggestionFriendshipButton from "../../components/Common/SuggestionFriendship";

export default function Index() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: suggestions } = useSWR("/profile/suggestions", {
    refreshInterval: 0,
    revalidate: false,
  });

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
  return (
    <AppLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: 1,
          paddingY: "1rem",
          "&.MuiBox-root": { pb: 0, mb: 4 },
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
      </Box>
      <Box
        sx={{ borderRight: 1, borderLeft: 1, borderColor: "background.paper" }}
      >
        {suggestions?.map((item) => (
          <List sx={{ "&.MuiList-root": { pt: 0, pb: 0 } }} key={item.userId}>
            <ListItem
              button
              secondaryAction={
                <SuggestionFriendshipButton
                  onClick={() => handleAdd(item.userId)}
                  userId={item.userId}
                />
              }
              disablePadding
            >
              <Link href={`/profile/${item.userId}`} passHref>
                <ListItemButton sx={{ "&.MuiListItemButton-root": { p: 3 } }}>
                  <ListItemAvatar>
                    <CustomAvatar
                      displayName={item.displayName}
                      image={item.image}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    {item.displayName}
                    {item.role === "mentor" && (
                      <VerifiedUserRoundedIcon color="primary" />
                    )}
                  </ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
          </List>
        ))}
        <Divider />
      </Box>
    </AppLayout>
  );
}
