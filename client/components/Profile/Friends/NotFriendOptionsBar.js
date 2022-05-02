import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import HelpCenterRounded from "@mui/icons-material/HelpCenterRounded";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
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
  LinearProgress,
  Grid,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { UserReport } from "../../../validations/userReport";
import FileDropzone from "../../Common/FileDropzone";

export default function MentorNotFriendOptionsBar({
  userId,
  friendInfo,
  role,
  requests,
}) {
  const [openReport, setOpenReport] = React.useState(false);
  const [openRequest, setOpenRequest] = React.useState(false);
  const [questMentored, setQuestMentored] = React.useState("");
  const [isAdded, setIsAdded] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState([]);
  const [reportUpload, setReportUpload] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
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
    if (friendInfo.isBanned !== true) {
      setOpenReport(true);
    } else {
      enqueueSnackbar("This user is currently banned.");
    }
  };

  const handleCloseReport = () => {
    setOpenReport(false);
    reset();
    setUploadedFile([]);
    setReportUpload("");
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
          enqueueSnackbar("You have already reported this user!");
        } else {
          axios({
            method: "POST",
            url: `/api/profile/${userId}/report`,
            data: {
              userId,
              values,
              reportUpload,
            },
          })
            .then(() => {
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
    setUploadedFile([]);
    setReportUpload("");
  };

  const handleAdd = () => {
    setIsAdded(true);
    axios({
      method: "get",
      url: `/api/profile/${userId}/checkrequest`,
      data: {
        userId,
      },
    })
      .then((response) => {
        if (response.data.length !== 1) {
          axios({
            method: "POST",
            url: `/api/profile/${userId}/addafriend`,
            data: {
              userId,
            },
          })
            .then(() => {
              enqueueSnackbar("You have successfully sent a friend request!");
              mutate(`/api/profile/${userId}/checkrequest`);
              setIsAdded(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          enqueueSnackbar(
            "There is an existing request for this user. Please check your incoming/outgoing requests.",
          );
          setIsAdded(false);
        }
      })
      .catch((error) => {
        console.log(error);
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
          if (
            response.data.avail === null &&
            response.data.hasMentor === null
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
            response.data.avail !== null &&
            response.data.hasMentor === null
          ) {
            enqueueSnackbar(
              "This Quest is currently being requested to be mentored! Please choose another Quest!",
            );
            setQuestMentored("");
          } else if (
            response.data.avail === null &&
            response.data.hasMentor !== null
          ) {
            enqueueSnackbar(
              "This Quest already has a mentor! Please choose another Quest!",
            );
            setQuestMentored("");
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
  function getFileExtension(filename) {
    const a = filename.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
      return "";
    }
    return a.pop();
  }
  const callAPIs = async (file) => {
    const { name, type } = file;
    const id = uuidv4();
    const extension = getFileExtension(name);
    const key = `reports/${userId}/${id}.${extension}`; // uuidv4()
    const signedURL = `/api/reports/${userId}/userReport?type=${encodeURIComponent(
      type,
    )}&key=${key}`;
    // eslint-disable-next-line
    setReportUpload(key);
    const { data: awsURL } = await axios.get(signedURL);

    await axios.put(awsURL, file, {
      headers: {
        "content-type": type,
      },
    });
  };

  const uploadImage = async (acceptedFile) => {
    setLoading(true);
    setIsDisabled(true);
    const fileUploadStatus = [];
    setUploadedFile([acceptedFile[0]]);
    fileUploadStatus.push(callAPIs(acceptedFile[0]));
    try {
      await Promise.all(fileUploadStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsDisabled(false);
    }
  };
  const dropzoneConfig = {
    multiple: false,
    maxSize: 52428800,
    accept: "image/jpeg, image/png",
    onDropAccepted: uploadImage,
    onDropRejected: () => {
      enqueueSnackbar("File type not accepted");
    },
    disabled: loading,
  };
  const removeImage = async () => {
    const deleteVal = reportUpload;
    const deleteURL = `/api/reports/${userId}/deleteReport?key=${deleteVal}`;
    try {
      await axios.get(deleteURL);
    } catch (err) {
      if (err.response.status === 500) {
        enqueueSnackbar("Error in deletion!");
      }
    }
    setUploadedFile([]);
    setReportUpload("");
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
        disabled={isAdded}
      >
        {" "}
        <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />
        {requests.length !== 0 ? "Pending" : "Add Friend"}
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
                <Typography style={{ fontSize: "12px" }} sx={{ mt: 1, mb: 1 }}>
                  You may also upload supporting evidence here
                </Typography>
                <FileDropzone
                  dropzoneTitle="Drag and drop the image here, or click to add."
                  useDropzoneProps={dropzoneConfig}
                />
                {loading && <LinearProgress sx={{ mt: 2 }} />}
                {uploadedFile.map((elem) => (
                  <Grid
                    item
                    xs={2}
                    key={uploadedFile.indexOf(elem)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography style={{ fontSize: "12px" }}>
                      {elem.name}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        removeImage(uploadedFile.indexOf(elem));
                      }}
                    >
                      <CloseRoundedIcon />
                    </Button>
                  </Grid>
                ))}
              </FormControl>
            </DialogContent>
          </Stack>
          <DialogActions>
            <Button onClick={handleCloseReport}>Cancel</Button>
            <Button type="submit" disabled={isDisabled}>
              Report
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {role === "member" && friendInfo.role === "mentor" ? (
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
    </Box>
  );
}
