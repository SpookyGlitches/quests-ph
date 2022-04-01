import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import axios from "axios";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import HelpCenterRounded from "@mui/icons-material/HelpCenterRounded";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Stack,
  FormHelperText,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { UserReport } from "../../../validations/userReport";

export default function MentorNotFriendOptionsBar({
  userId,
  friendInfo,
  action,
  role,
}) {
  const [openReport, setOpenReport] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [openSb, setOpenSb] = React.useState(false);
  const currentValidationSchema = UserReport[0];
  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
    defaultValues: {
      category: "",
      reportDetails: "",
    },
  });
  const { control, handleSubmit, reset, formState } = methods;
  const { errors } = formState;
  const handleReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };
  const onSubmit = (values) => {
    axios({
      method: "get",
      url: `/api/profile/${userId}/report`,
      data: {
        userId,
      },
    })
      .then((response) => {
        if (response.data[0].length === 1 && values.category === "Spamming") {
          setMessage("You've already reported this user for spamming.");
          setOpenSb(true);
        } else if (
          response.data[1].length === 1 &&
          values.category === "Harassment"
        ) {
          setMessage("You've already reported this user for Harassment.");
          setOpenSb(true);
        } else if (
          response.data[2].length === 1 &&
          values.category === "Fraud"
        ) {
          setMessage("You've already reported this user for Fraud.");
          setOpenSb(true);
        } else if (
          response.data[3].length === 1 &&
          values.category === "Others"
        ) {
          setMessage("You've already reported this user.");
          setOpenSb(true);
        } else {
          axios({
            method: "POST",
            url: `/api/profile/${userId}/report`,
            data: {
              userId,
              values,
            },
          }) // eslint-disable-next-line
            .then((res) => {
              setMessage("You have reported this user!");
              setOpenSb(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
    setOpenReport(false);
  };

  const handleAdd = () => {
    axios({
      method: "get",
      url: `/api/profile/${userId}/outgoingFriend`,
      data: {
        userId,
      },
    })
      .then((response) => {
        if (response.data.length !== 1) {
          axios({
            method: "POST",
            url: `/api/profile/${userId}/addFriend`,
            data: {
              userId,
            },
          })
            .then((res) => {
              setMessage("You have successfully sent a friend request!");
              setOpenSb(true);
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setMessage(
            "You've already added this user. Please check your outgoing requests.",
          );
          setOpenSb(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSb(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
      style={{
        height: "auto",
        width: "auto",
        display: "flex",
        padding: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Snackbar
        open={openSb}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={message}
        action={action}
      />
      <Button
        variant="outlined"
        style={{
          width: 150,
          display: "flex",
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
        }}
        sx={{ mr: 2 }}
        onClick={handleAdd}
      >
        {" "}
        <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />
        Add Friend
      </Button>
      <Button
        variant="outlined"
        style={{
          width: 100,
          display: "flex",
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
        }}
        onClick={handleReport}
      >
        <ErrorRoundedIcon sx={{ mr: 1 }} />
        Report
      </Button>
      <Dialog open={openReport} onClose={handleCloseReport}>
        <DialogTitle>Report User</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1.5} sx={{ mt: "-1.5em" }}>
            <DialogContent>
              <DialogContentText>
                Report this user by filling out the following details.
              </DialogContentText>

              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <FormControl variant="filled">
                      <InputLabel>
                        Select the category of your report
                      </InputLabel>

                      <Select onChange={onChange} value={value}>
                        <MenuItem value="Spamming">Spamming</MenuItem>
                        <MenuItem value="Harassment">Harassment</MenuItem>
                        <MenuItem value="Fraud">Fraud</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                      <FormHelperText style={{ color: "red" }}>
                        {errors.category && errors.category.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="reportDetails"
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      id="filled-basic"
                      label="Explain more about your report here"
                      multiline
                      rows={2}
                      onChange={onChange}
                      value={value}
                      sx={{ mt: 2 }}
                      error={
                        errors.reportDetails && errors.reportDetails.message
                      }
                      helperText={
                        errors.reportDetails ? errors.reportDetails.message : ""
                      }
                    />
                  )}
                />
              </FormControl>
            </DialogContent>
          </Stack>
          <DialogActions>
            <Button onClick={handleCloseReport}>Cancel</Button>
            <Button type="submit">Report</Button>
          </DialogActions>
        </form>
      </Dialog>
      {role === "member" && friendInfo.role === "mentor" ? (
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
            float: "right",
            maxWidth: "105px",
            minWidth: "105px",
            marginRight: "1em",
          }}
        >
          <HelpCenterRounded sx={{ mr: 1 }} />
          Request
        </Button>
      ) : (
        // eslint-disable-next-line
        <></>
      )}
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
          float: "right",
        }}
      >
        <CommentRoundedIcon sx={{ mr: 1 }} />
        Chat
      </Button>
    </Box>
  );
}
