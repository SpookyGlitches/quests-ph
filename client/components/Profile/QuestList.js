import {
  Stack,
  Card,
  Typography,
  CardHeader,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function QuestChart() {
  const [dataTable, setDataTable] = useState([]);
  const [category, setCategory] = React.useState("");
  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category);
  };
  const gatherData = () => {
    axios
      .get("/api/profile/questlist")
      .then((res) => {
        setDataTable(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    gatherData();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
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
            </Card>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
