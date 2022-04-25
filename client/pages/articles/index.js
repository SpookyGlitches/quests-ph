import * as React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSession } from "next-auth/react";
import AppLayout from "../../components/Layouts/AppLayout";
import Articles from "../../components/Articles/Articles";
import SubmitArticles from "../../components/Articles/SubmitArticles";
import AccessDenied from "../../components/Error/AccessDenied";

export default function Search() {
  const { data: session } = useSession();
  const [category, setCategory] = React.useState("Health");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const showArticles = (val) => {
    switch (val) {
      case "Health":
        return <Articles category="HEALTH" />;

      case "Social":
        return <Articles category="SOCIAL" />;

      case "Career":
        return <Articles category="CAREER" />;

      default:
        return <Articles category="HEALTH" />;
    }
  };

  if (session) {
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
              <InputLabel id="demo-simple-select-label">{category}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
                style={{ background: "white" }}
              >
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Career">Career</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {showArticles(category)}
        </Box>
      </AppLayout>
    );
  }
  return <AccessDenied />;
}
