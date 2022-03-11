import { Typography, Box } from "@mui/material";
import AppLayout from "../../components/Layouts/AppLayout";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DataFieldHolder from "../../components/Settings/DataFieldHolder";

const Index = () => {
  return (
    <AppLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          pt: "5rem",
          pb: "10rem",
          px: "2rem",
          margin: "2rem",
          borderRadius: 2,
        }}
      >
        <Typography color="primary" variant="h4">
          <SettingsRoundedIcon sx={{ marginRight: "1rem" }} />
          Account Settings
        </Typography>

        <Box
          sx={{
            backgroundColor: "background.paper",
            display: "inline-flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.paper",
              marginTop: "2rem",
              flexDirection: "column",
            }}
          >
            <DataFieldHolder field="Name" />
            <DataFieldHolder field="Display Name" />
            <DataFieldHolder field="Email Address" />
            <DataFieldHolder field="Password" />
            <DataFieldHolder field="Birthday" />
          </Box>
          <Box
            sx={{
              backgroundColor: "background.paper",
              marginTop: "2rem",
              marginLeft: "7rem",
              flexDirection: "column",
              borderRadius: 2,
            }}
          >
            <DataFieldHolder value="Ninomae Inanis" />
            <DataFieldHolder value="grapejuice" />
            <DataFieldHolder value="inanis@hololive.com" />
            <DataFieldHolder value="*********" />
            <DataFieldHolder value="May 20, 2000" />
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
};
export default Index;
