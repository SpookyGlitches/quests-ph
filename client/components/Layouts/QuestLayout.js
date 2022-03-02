import AppLayout from "./AppLayout";
import { Box, Grid } from "@mui/material";
import QuestHeader from "../Quest/QuestHeader";

export default function QuestLayout({ children }) {
  return (
    <AppLayout>
      <Grid container sx={{ paddingTop: "1.2rem" }} spacing={10}>
        <Grid item xs={12} md={9}>
          <QuestHeader />
          <Box sx={{ marginTop: "2rem" }}>{children}</Box>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* todo: <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              height: "auto",
              padding: "1rem",
            }}
          ></Box> */}
        </Grid>
      </Grid>
    </AppLayout>
  );
}
