import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import HelpCenterRounded from "@mui/icons-material/HelpCenterRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import axios from "axios";
import Router from "next/router";
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
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { useSnackbar } from "notistack";
import { UserReport } from "../../../validations/userReport";

export default function FriendsOptionsBar({
  userId,
  friendshipId,
  friendInfo,
  role,
}) {
  const [open, setOpen] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [openRequest, setOpenRequest] = React.useState(false);
  const [questMentored, setQuestMentored] = React.useState("");

  const { enqueueSnackbar } = useSnackbar();

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
          enqueueSnackbar("You have already reported this user for Spamming.");
        } else if (
          response.data[1].length === 1 &&
          values.category === "Harassment"
        ) {
          enqueueSnackbar(
            "You have already reported this user for Harassment.",
          );
        } else if (
          response.data[2].length === 1 &&
          values.category === "Fraud"
        ) {
          enqueueSnackbar("You have already reported this user for Fraud.");
        } else if (
          response.data[3].length === 1 &&
          values.category === "Others"
        ) {
          enqueueSnackbar("You have already reported this user.");
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
              enqueueSnackbar("You have reported this user!");
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    // axios here
    setOpen(false);
    await axios({
      method: "put",
      url: "/api/friends/deleteFriend",
      data: {
        friendshipId,
      },
      // eslint-disable-next-line
    }).then((res) => {
      Router.reload();
    });
  };
  const handleRequest = () => {
    if (friendInfo.isActive !== "1") {
      enqueueSnackbar("This mentor is currently on the process of approval.");
    } else {
      setOpenRequest(true);
    }
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
  };
  const submitMentor = () => {
    if (questMentored !== "") {
      axios
        .get(`/api/profile/${userId}/mentorrequest`, {
          params: {
            questMentored,
          },
        })
        .then((response) => {
          console.log(response.data.avail.length);
          console.log(response.data.hasMentor.length);
          if (
            response.data.avail.length === 0 &&
            response.data.hasMentor.length === 0
          ) {
            axios({
              method: "POST",
              url: `/api/profile/${userId}/mentorrequest`,
              data: {
                questMentored,
              },
            })
              .then(() => {
                enqueueSnackbar("You have sent a request!");
                setQuestMentored("");
              })
              .catch((error) => {
                console.log(error);
              });
            setOpenRequest(false);
          } else if (
            response.data.avail.length === 1 &&
            response.data.hasMentor.length === 0
          ) {
            enqueueSnackbar(
              "This Quest is currently being requested to be mentored! Please choose another Quest!",
            );
          } else {
            enqueueSnackbar(
              "This Quest is already has a mentor! Please choose another Quest!",
            );
          }
        });
    } else {
      enqueueSnackbar("Please choose a valid Quest!");
      setOpenRequest(true);
    }
  };

  const handleChange = (event) => {
    setQuestMentored(event.target.value);
  };

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: questsPartyLeader } = useSWR(
    "/api/profile/getongoingquests",
    fetcher,
  );

  if (!questsPartyLeader) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }
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
      <Button
        variant="outlined"
        style={{
          width: 100,
          display: "flex",
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
        }}
        sx={{ mr: 2 }}
        onClick={handleClickOpen}
      >
        {" "}
        <PersonRemoveAlt1RoundedIcon sx={{ mr: 1 }} />
        Unfriend
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete Friend</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete {friendInfo.displayName} as a
            friend?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Okay</Button>
        </DialogActions>
      </Dialog>
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
      {role === "member" && friendInfo.role === "mentor" ? ( // if user is a member while friend is a mentor, render a request button
        <>
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
            onClick={handleRequest}
          >
            <HelpCenterRounded sx={{ mr: 1 }} />
            Request
          </Button>
          <Dialog
            open={openRequest}
            onClose={handleCloseRequest}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography variant="h4" style={{ color: "#755cde" }}>
                Request for Mentorship
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Choose which Quest below you want to be mentored by{" "}
                {friendInfo.fullName}.
              </DialogContentText>

              <FormControl
                fullWidth
                variant="filled"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Quests that can be mentored
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={questMentored}
                  defaultValue=""
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/* eslint-disable-next-line */}
                  {questsPartyLeader.map((item, index) => (
                    // eslint-disable-next-line
                    <MenuItem key={index} value={item.questId}>
                      {item.wish}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRequest}>Cancel</Button>
              <Button onClick={submitMentor} autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </>
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
