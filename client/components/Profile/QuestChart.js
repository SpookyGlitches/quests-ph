import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

import { Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function QuestChart() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
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
            // maxHeight: "40rem!important",
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
                  label: function (tooltipItem) {
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
                data: [20, 40, 60],
                backgroundColor: [
                  "rgba(255, 159, 64)",
                  "rgb(37, 230, 230)",
                  "rgb(235, 91, 91)",
                ],
                borderWidth: 0,
                borderRadius: matches ? 20 : 10,
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
}
