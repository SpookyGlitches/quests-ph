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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import React, { useState } from "react";

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
  const [questArr, setQuestArr] = useState([]);
  // const [flag, setFlag] = useState(0);
  const theme = useTheme();
  if (userId !== "") {
    // const questsNum = [];
    // let career = 0;
    // let social = 0;
    // let health = 0;
    axios
      .get("/api/profile/questchart")
      // eslint-disable-next-line
      .then((res) => {
        // console.log(res.data);
        //   const questData = res.data;
        //   for (let x = 0; x < questData.length; x++) {
        //     if (questData[x].category === "CAREER") {
        //       career++;
        //     } else if (questData[x].category === "SOCIAL") {
        //       social++;
        //     } else {
        //       health++;
        //     }
        //   }
        //   questsNum[0] = health;
        //   questsNum[1] = social;
        //   questsNum[2] = career;
        //   setQuestArr(questsNum);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                data: questArr,
                backgroundColor: [
                  "rgb(21,136,25)",
                  "rgb(101,19,223)",
                  "rgb(218,83,83)",
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
