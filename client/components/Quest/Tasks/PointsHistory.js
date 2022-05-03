import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";

import { alpha } from "@mui/material/styles";

import useSWR from "swr";
import { useRouter } from "next/router";
import CustomSpinner from "../../Common/CustomSpinner";

const PointsHistory = () => {
  const router = useRouter();

  const { data: pointsLog } = useSWR(
    `quests/${router.query.questId}/tasks/pointsLog`,
  );

  if (!pointsLog) return <CustomSpinner />;

  const points = pointsLog.map((x) => x.gainedPoints);

  const initialValue = 0;
  const sumWithInitial = points.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue,
  );

  console.log(sumWithInitial);

  /* eslint-disable */
  const poinstLogCondition = (item) => {
    if (item.action === "COMPLETED_TASK") {
      return (
        <>
          <ListItem sx={{ "&.MuiListItem-root": { pt: 0, pb: 0 } }}>
            <TimelineRoundedIcon
              sx={{ marginRight: "10px", color: "#755CDE" }}
            />
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "14px" }}>
                  You completed a task
                </Typography>
              }
            />
            <Typography
              color="#755CDE"
              sx={{ fontSize: "14px", fontWeight: "medium" }}
            >
              +{item.gainedPoints}
            </Typography>
          </ListItem>
          <Divider />
        </>
      );
    }
    if (item.action === "RECEIVED_POST_REACT") {
      return (
        <>
          <ListItem sx={{ "&.MuiListItem-root": { pt: 0, pb: 0 } }}>
            <AddReactionRoundedIcon
              sx={{ marginRight: "10px", color: "#755CDE" }}
            />
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "14px" }}>
                  Received Post React
                </Typography>
              }
            />
            <Typography
              color="#755CDE"
              sx={{ fontSize: "14px", fontWeight: "medium" }}
            >
              +{item.gainedPoints}
            </Typography>
          </ListItem>
          <Divider />
        </>
      );
    }
    if (item.action === "RECEIVED_POST_COMMENT") {
      return (
        <>
          <ListItem sx={{ "&.MuiListItem-root": { pt: 0, pb: 0 } }}>
            <PostAddRoundedIcon
              sx={{ marginRight: "10px", color: "#755CDE" }}
            />
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "14px" }}>
                  Received Comment React
                </Typography>
              }
            />
            <Typography
              color="#755CDE"
              sx={{ fontSize: "14px", fontWeight: "medium" }}
            >
              +{item.gainedPoints}
            </Typography>
          </ListItem>
          <Divider />
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        borderRadius: 1,
        border: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.8),
          borderRadius: 0.3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body2"
          color="white"
          sx={{ p: 2, fontWeight: "medium" }}
        >
          Point History
        </Typography>
        <Typography
          variant="body2"
          color="white"
          sx={{ p: 2, fontWeight: "bold" }}
        >
          Points: {sumWithInitial}
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {pointsLog?.map((item) => (
          <List
            key={item.pointsLogId}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {poinstLogCondition(item)}
          </List>
        ))}
      </Box>
      {pointsLog?.length < 0 && (
        <Typography align="center" sx={{ margin: 1 }}>
          Start Earning Points
        </Typography>
      )}
    </Box>
  );
};

export default PointsHistory;
