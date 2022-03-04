import { Box, Checkbox, Typography, Stack } from "@mui/material";
import faker from "@faker-js/faker";
import { useState } from "react";
export default function ToDo() {
  const [items] = useState([
    faker.lorem.lines(3),
    faker.lorem.lines(4),
    faker.lorem.lines(1),
  ]);

  const TaskItem = ({ value }) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <Checkbox edge="start" disableRipple />
        <Box component="div">
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {value}
          </Typography>
          <Typography variant="caption">3 days left, 30 points</Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h5" color="primary" sx={{}}>
          To Do
        </Typography>
        <Box
          sx={{ maxHeight: "10rem", overflowY: "scroll", overflowX: "hidden" }}
        >
          {items.map((value, index) => {
            return <TaskItem key={index} value={value} />;
          })}
        </Box>

        {items.length === 0 && (
          <Typography>There&apos;s nothing to do. Hooray! </Typography>
        )}
      </Stack>
    </Box>
  );
}
