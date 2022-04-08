import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import React from "react";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
export default function FriendsQuestChart({ userId }) {
  // eslint-disable-next-line
  const { data: friendQuests } = useSWR(
    userId ? `/profile/${userId}/friendchart` : null,
  );
  if (!friendQuests) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }
  const questsArrComplete = [];
  let healthCount = 0;
  let socialCount = 0;
  let careerCount = 0;

  friendQuests.forEach((item) => {
    // eslint-disable-next-line
    for (const key in item) {
      if (item[key].category === "HEALTH") {
        healthCount++;
      } else if (item[key].category === "SOCIAL") {
        socialCount++;
      } else {
        careerCount++;
      }
    }
  });
  questsArrComplete.push(healthCount);
  questsArrComplete.push(socialCount);
  questsArrComplete.push(careerCount);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
        padding: "1rem",
      }}
    >
      <Typography align="center" variant="h6" sx={{ marginY: "0.5rem" }}>
        Quests Completed
      </Typography>
      <Box
        sx={{
          position: "relative",
          padding: "0.2rem",
          "& canvas": {
            width: "100%!important",
            maxHeight: "10rem!important",
          },
        }}
      >
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label(tooltipItem) {
                    return `${tooltipItem.parsed.y} ${tooltipItem.label} Quests completed`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {},
              },
              y: {
                ticks: {
                  precision: 0,
                },
              },
            },
          }}
          data={{
            labels: ["Health", "Social", "Career"],
            datasets: [
              {
                data: questsArrComplete,
                backgroundColor: [
                  "rgb(21,136,25)",
                  "rgb(101,19,223)",
                  "rgb(218,83,83)",
                ],
                borderWidth: 0,
                borderRadius: 10,
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}
