import {
  Stack,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export default function MyQuestChart() {
  const [dataTable, setDataTable] = useState([]);
  const [category, setCategory] = useState(0);
  const questsArr = [];
  let x = 0;
  const gatherData = (val) => {
    if (val === 0) {
      axios
        .get(`/api/profile/questslistactive`)
        .then((res) => {
          const questsFriend = res.data;
          questsFriend.forEach((item) => {
            // eslint-disable-next-line
            for (const key in item) {
              questsArr[x] = item[key];
              x++;
            }
          });
          setDataTable(questsArr);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`/api/profile/questslistinactive`)
        .then((res) => {
          const questsFriend = res.data;
          questsFriend.forEach((item) => {
            // eslint-disable-next-line
            for (const key in item) {
              questsArr[x] = item[key];
              x++;
            }
          });
          setDataTable(questsArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
    gatherData(event.target.value);
  };

  useEffect(() => {
    gatherData(category);
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        border: "1px solid rgba(0, 0, 0, 0.12)",
        padding: "1rem",
      }}
    >
      <Box
        style={{
          height: 100,
          display: "flex",

          padding: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          align="left"
          variant="h4"
          sx={{ mt: "-2rem", ml: "0.2rem" }}
        >
          Quests
        </Typography>
        <FormControl
          style={{ width: "50%" }}
          sx={{ mt: "-2rem", mr: "0.2rem" }}
        >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
            style={{ background: "white" }}
          >
            <MenuItem value={0}>Active</MenuItem>
            <MenuItem value={1}>Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
        {dataTable.map((elem) => (
          <Stack
            item
            xs={3}
            key={dataTable.indexOf(elem)}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Card>
              <CardHeader
                title={`${elem.wish}`}
                subheader={`${elem.category}`}
              />
              <CardContent>
                <Grid container spacing={3} sx={{ ml: "0em" }}>
                  <AccessTimeRoundedIcon sx={{ mr: 1 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: "0.2em" }}
                  >
                    {format(
                      new Date(`${elem.estimatedStartDate}`),
                      "MMMM d, yyyy",
                    )}{" "}
                    -{" "}
                    {format(
                      new Date(`${elem.estimatedEndDate}`),
                      "MMMM d, yyyy",
                    )}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
