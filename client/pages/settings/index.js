import * as React from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useSession, getSession } from "next-auth/react";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
// import editMemberAccount from "../api/auth/[userId]/editmemberaccount";

import {
  TextField,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { EditMemberValidations } from "../../validations/UserEdit";
import DataFieldHolder from "../../components/Settings/DataFieldHolder";
import AppLayout from "../../components/Layouts/AppLayout";

const Index = () => {
  const { data: session } = useSession();
  const [openProfileForm, setopenProfileForm] = React.useState(false);

  const handleProfileClickOpen = () => {
    setopenProfileForm(true);
  };

  const handleProfileClosed = () => {
    setopenProfileForm(false);
  };
  // const [data, setData] = React.useState(session.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EditMemberValidations) });

  const onSubmit = async (data) => {
    data.userId = session.user.userId; // eslint-disable-line no-param-reassign
    try {
      await axios
        .put(`/api/auth/${session.user.userId}/editmemberaccount`, data)
        .then(() => {
          handleProfileClosed();
        });
    } catch (error) {
      console.log(error);
    }
  };

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
            {/* <DataFieldHolder field="Password" /> */}
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
            <DataFieldHolder value={session.user.fullName} />
            <DataFieldHolder value={session.user.displayName} />
            <DataFieldHolder value={session.user.email} />
            {/* <DataFieldHolder value="*********" /> */}
            <DataFieldHolder value={session.user.dateOfBirth} />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileClickOpen}
          >
            Edit Profile
          </Button>
        </Box>

        <Box
          style={{
            height: 100,
            display: "flex",

            padding: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Dialog open={openProfileForm} onClose={handleProfileClosed}>
            <DialogTitle>
              <Typography variant="h4" style={{ color: "#755cde" }}>
                Edit Profile
              </Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent sx={{ mt: -1 }}>
                <DialogContentText>
                  <Typography>Edit your profile credentials here.</Typography>
                </DialogContentText>

                <Controller
                  control={control}
                  name="fullName"
                  defaultValue={session.user.fullName}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <TextField
                      autoFocus
                      // eslint-disable-next-line
                      value={value}
                      // eslint-disable-next-line
                      onChange={(value) => onChange(value)}
                      margin="dense"
                      id="fullName"
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      sx={{ mt: 2 }}
                      helperText={
                        errors.fullName && <p>{errors.fullName.message}</p>
                      }
                      error={invalid}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="displayName"
                  defaultValue={session.user.displayName}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <TextField
                      autoFocus
                      // eslint-disable-next-line
                      value={value}
                      // eslint-disable-next-line
                      onChange={(value) => onChange(value)}
                      margin="dense"
                      id="displayName"
                      fullWidth
                      label="Display Name"
                      variant="outlined"
                      sx={{ mt: 2 }}
                      helperText={
                        errors.displayName && (
                          <p>{errors.displayName.message}</p>
                        )
                      }
                      error={invalid}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  defaultValue={session.user.email}
                  render={({
                    field:
                      // eslint-disable-next-line
                      { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <TextField
                      autoFocus
                      // eslint-disable-next-line
                      value={value}
                      // eslint-disable-next-line
                      onChange={(value) => onChange(value)}
                      margin="dense"
                      id="email"
                      fullWidth
                      label="Email"
                      variant="outlined"
                      sx={{ mt: 2 }}
                      helperText={errors.email && <p>{errors.email.message}</p>}
                      error={invalid}
                    />
                  )}
                />

                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={session.user.dateOfBirth}
                  render={({
                    // eslint-disable-next-line
                    field:
                      // eslint-disable-next-line
                      { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <DatePicker
                      label="Date of Birth"
                      value={value}
                      // eslint-disable-next-line
                      onChange={(value) =>
                        onChange(moment(value).format("YYYY-MM-DD"))
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ mt: 2 }}
                          helperText={
                            errors.dateOfBirth && (
                              <p>{errors.dateOfBirth.message}</p>
                            )
                          }
                          id="dateOfBirth"
                          {...params}
                          error={invalid}
                        />
                      )}
                    />
                  )}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleProfileClosed}
                  variant="outlined"
                  color="primary"
                  style={{
                    backgroundColor: "#B0B0B0",
                    borderColor: "#E8E8E8",
                    color: "white",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ m: 1 }}
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      </Box>
    </AppLayout>
  );
};
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Index;
