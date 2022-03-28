import { Box, Grid } from "@mui/material";
import PartyList from "../../../../components/Quest/Party/PartyList";
import BanList from "../../../../components/Quest/Party/BanList";
import QuestLayout from "../../../../components/Layouts/QuestLayout";

const index = () => {
  return (
    <Grid
      container
      sx={{ paddingTop: "1.2rem" }}
      columnSpacing={8}
      rowSpacing={4}
    >
      <Grid item xs={12} lg={12}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            height: "auto",
            padding: "0.5rem",
          }}
        >
          <PartyList />
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            height: "auto",
            padding: "0.5rem",
            marginTop: "2em",
          }}
        >
          <BanList />
        </Box>
      </Grid>
    </Grid>
  );
};
export default index;

index.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};