import React from "react";

import { Typography, Box } from "@mui/material";
import { format } from "date-fns";

const DateCard = () => {
  return (
    <Box
      display={{ md: "block", xs: "none" }}
      sx={{
        paddingX: "1rem",
        paddingY: "1rem",
        backgroundColor: "background.paper",
        borderRadius: 1,
        border: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Typography sx={{ color: "#755cde", fontSize: 20, fontWeight: "bold" }}>
        {format(new Date(), "'Today is' eeee")}
      </Typography>
      <Typography variant="body1">
        {format(new Date(), "MMMM dd yyyy")}
      </Typography>
    </Box>
  );
};

export default DateCard;
