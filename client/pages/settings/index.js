import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useForm, Controller } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useSession, getSession } from "next-auth/react";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import NoDataPage from "../noData";
import Notification from "../../components/Common/Notification";
import { ChangePasswordValidations } from "../../validations/ChangePassword";
import { EditMemberValidations } from "../../validations/UserEdit";
import { EditMentorValidations } from "../../validations/UserMentorEdit";
import DataFieldHolder from "../../components/Settings/DataFieldHolder";
import AppLayout from "../../components/Layouts/AppLayout";

export default function Index() {
  const [openProfileForm, setopenProfileForm] = React.useState(false);
  const [openResetPasswordForm, setopenResetPasswordForm] =
    React.useState(false);

  // Open and close of Edit Profile form
  const handleProfileClickOpen = () => {
    setopenProfileForm(true);
  };

  const handleProfileClosed = () => {
    setopenProfileForm(false);
  };

  // Open and close of Change Password form
  const handleResetPasswordClickOpen = () => {
    setopenResetPasswordForm(true);
  };

  const handleResetPasswordClosed = () => {
    setopenResetPasswordForm(false);
  };

  // Show password and confirm password fields
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const session = useSession();
  const mentor = session?.data?.user?.role === "mentor";

  const objectValidation = mentor
    ? EditMentorValidations
    : EditMemberValidations;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(objectValidation) });

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    reset,
    formState: { errors: errorsPassword },
  } = useForm({ resolver: yupResolver(ChangePasswordValidations) });
  const { mutate } = useSWRConfig();
  const { data: userCredentials, error } = useSWR("/auth/getUserCredentials");

  if (error) {
    console.log(error);
    return <NoDataPage />;
  }
  if (!userCredentials) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const onSubmitDetails = async (data) => {
    data.userId = userCredentials.userId; // eslint-disable-line no-param-reassign
    try {
      await axios
        .put(`/api/auth/${userCredentials.userId}/editmemberaccount`, data)
        .then(() => {
          handleProfileClosed();
          mutate(`/auth/getUserCredentials`);
          setNotify({
            isOpen: true,
            message: "Data updated successfully",
            type: "success",
          });
        });
    } catch (err) {
      setNotify({
        isOpen: true,
        message: err.response.data.message,
        type: "error",
      });
    }
  };

  const onSubmitChangePassword = async (changeData) => {
    // eslint-disable-next-line no-param-reassign
    changeData.userId = userCredentials.userId;

    try {
      await axios
        .put(`/api/auth/${userCredentials.userId}/changePassword`, changeData)
        .then(() => {
          handleResetPasswordClosed();
          setNotify({
            isOpen: true,
            message: "Password changed successfully",
            type: "success",
          });
        });
      reset();
    } catch (err) {
      setNotify({
        isOpen: true,
        message: err.response.data.message,
        type: "error",
      });
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: "5rem",
        pb: "5rem",
        px: "2rem",
        margin: "2rem",
        borderRadius: 2,
      }}
    >
      <Notification notify={notify} setNotify={setNotify} />
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
          <DataFieldHolder
            value={userCredentials ? userCredentials.fullName : <div />}
          />
          <DataFieldHolder
            value={userCredentials ? userCredentials.displayName : <div />}
          />
          <DataFieldHolder
            value={userCredentials ? userCredentials.email : <div />}
          />
          {/* <DataFieldHolder value="*********" /> */}
          <DataFieldHolder
            value={
              userCredentials ? (
                userCredentials.dateOfBirth.substring(0, 10)
              ) : (
                <div />
              )
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Button
          variant="contained"
          onClick={handleProfileClickOpen}
          sx={{
            color: (theme) => theme.primary,
            width: 1 / 5,
          }}
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          onClick={handleResetPasswordClickOpen}
          sx={{
            color: (theme) => theme.primary,
            width: 1 / 5,
          }}
        >
          Change Password
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
          <form onSubmit={handleSubmit(onSubmitDetails)}>
            <DialogContent sx={{ mt: -1 }}>
              <DialogContentText>
                <Typography>Edit your profile credentials here.</Typography>
              </DialogContentText>

              <Controller
                control={control}
                name="fullName"
                defaultValue={userCredentials ? userCredentials.fullName : ""}
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
                defaultValue={
                  userCredentials ? userCredentials.displayName : ""
                }
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
                      errors.displayName && <p>{errors.displayName.message}</p>
                    }
                    error={invalid}
                  />
                )}
              />

              {/* <Controller
                control={control}
                name="email"
                defaultValue={userCredentials ? userCredentials.email : ""}
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
              /> */}

              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue={
                  userCredentials ? userCredentials.dateOfBirth : ""
                }
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
                        variant="outlined"
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
        <Dialog
          open={openResetPasswordForm}
          onClose={handleResetPasswordClosed}
        >
          <DialogTitle>
            <Typography variant="h4" style={{ color: "#755cde" }}>
              Reset your Password
            </Typography>
          </DialogTitle>
          <form onSubmit={handleSubmitPassword(onSubmitChangePassword)}>
            <DialogContent sx={{ mt: -1 }}>
              <DialogContentText>
                <Typography>
                  Enter your old password and new password here.
                </Typography>
              </DialogContentText>

              <Controller
                control={controlPassword}
                name="password"
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
                    id="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    helperText={
                      errorsPassword.password && (
                        <p>{errorsPassword.password.message}</p>
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <VisibilityRoundedIcon />
                            ) : (
                              <VisibilityOffRoundedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={invalid}
                  />
                )}
              />

              <Controller
                control={controlPassword}
                name="confirmPassword"
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
                    id="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    helperText={
                      errorsPassword.confirmPassword && (
                        <p>{errorsPassword.confirmPassword.message}</p>
                      )
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                          >
                            {showConfirmPassword ? (
                              <VisibilityRoundedIcon />
                            ) : (
                              <VisibilityOffRoundedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={invalid}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleResetPasswordClosed}
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
  );
}

Index.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
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
