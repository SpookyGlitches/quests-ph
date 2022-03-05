import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";

const itemsToDisplay = 4;
const colors = [
  "#EB5B5B",
  "#28D4D4",
  "#BCCF74",
  "#25E6E6",
  "#E8D5D5",
  "#C4EB28",
  "#D0F7F7",
];

export default function BadgesList() {
  const badges = [];
  const [pagination, setPagination] = useState({
    start: 0,
    end: itemsToDisplay - 1,
  });

  for (let x = 0; x < 28; x++) {
    badges.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  const incrementPagination = () => {
    if (pagination.end - (badges.length - 1) == 0) return;
    if (pagination.end >= badges.length) return;
    setPagination((prev) => {
      return { start: prev.end + 1, end: prev.end + itemsToDisplay };
    });
  };
  const decrementPagination = () => {
    if (pagination.start <= 0) return;
    setPagination((prev) => {
      return {
        start: prev.start - itemsToDisplay,
        end: prev.end - itemsToDisplay,
      };
    });
  };

  const badgeItems = () => {
    const preview = badges.slice(pagination.start, pagination.end + 1);
    if (preview.length <= 0) return;
    return preview.map((item, index) => (
      <Box
        key={index}
        sx={{
          height: "5rem",
          width: "5rem",
          backgroundColor: item,
          borderRadius: "50%",
        }}
      >
        {" "}
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        paddingX: "1rem",
        paddingY: "1.5rem",
        width: "100%",
        borderRadius: 2,
      }}
    >
      <Typography sx={{ marginBottom: "1rem" }} align="center" variant="h6">
        Badges
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <IconButton onClick={decrementPagination}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: 6,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {badgeItems()}
        </Box>
        <Box>
          <IconButton onClick={incrementPagination}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
