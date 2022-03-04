import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";

export default function BadgesList() {
  const itemsToDisplay = 4;
  const [pagination, setPagination] = useState({
    start: 0,
    end: itemsToDisplay - 1,
  });
  const badges = [];
  const colors = [
    "#EB5B5B",
    "#28D4D4",
    "#BCCF74",
    "#25E6E6",
    "#E8D5D5",
    "#C4EB28",
    "#D0F7F7",
  ];
  for (let x = 0; x < 24; x++) {
    badges.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  const incrementPagination = () => {
    if (pagination.end < badges.length || pagination.end - badges.length != 0) {
      setPagination((prev) => {
        return { start: prev.end + 1, end: prev.end + itemsToDisplay };
      });
    } else {
      console.log("no more");
    }
    console.log(pagination);
  };
  const decrementPagination = () => {
    if (pagination.start > 0) {
      setPagination((prev) => {
        return {
          start: prev.start - itemsToDisplay,
          end: prev.end - itemsToDisplay,
        };
      });
    } else {
      console.log("no more");
    }
    console.log(pagination);
  };
  const badgeItems = () => {
    const preview = badges.slice(pagination.start, pagination.end + 1);
    if (preview.length > 0) {
      return preview.map((item, index) => (
        <Box
          sx={{
            height: "5rem",
            width: "5rem",
            backgroundColor: item,
            borderRadius: "50%",
          }}
          key={index}
        >
          {" "}
        </Box>
      ));
    } else {
      // return <Box sx={{ height: "3rem" }}>End 😃</Box>;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        paddingX: "1rem",
        paddingY: "1.5rem",
        display: "flex",
        height: "auto",
        alignItems: "center",
        borderRadius: 2,
      }}
    >
      <Box variant="body2">
        <IconButton onClick={decrementPagination}>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ marginBottom: "1.25rem" }} variant="h6">
          Badges
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            flexWrap: "wrap",
            gap: 1,
            height: "auto",
            justifyContent: "space-around",
          }}
        >
          {badgeItems()}
          {/* {badges
            .slice(pagination.start, pagination.end + 1)

            ))} */}
        </Box>
      </Box>
      <Box variant="body2">
        <IconButton onClick={incrementPagination}>
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
