import * as React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AppLayout from "../../components/Layouts/AppLayout";
import Articles from "../../components/Articles/Articles";
import SubmitArticles from "../../components/Articles/SubmitArticles";

export default function Search() {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const showArticles = (val) => {
    switch (val) {
      case 0:
        return <Articles category="HEALTH" />;

      case 1:
        return <Articles category="SOCIAL" />;

      case 2:
        return <Articles category="CAREER" />;

      default:
        return <Articles category="HEALTH" />;
    }
  };

  return (
    <AppLayout>
      <Box sx={{ marginY: "1rem", width: "100%" }}>
        <Box
          style={{
            height: 100,
            display: "flex",

            padding: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SubmitArticles />
          <FormControl
            style={{
              maxWidth: 300,
              minWidth: 300,
              minHeight: 60,
              maxHeight: 60,
            }}
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
              <MenuItem value={0}>Health</MenuItem>
              <MenuItem value={1}>Social</MenuItem>
              <MenuItem value={2}>Career</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {showArticles(category)}
      </Box>
    </AppLayout>
  );
}
