import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Stack,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  LinearProgress,
} from "@mui/material";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { MentorRegistration } from "../../validations/MentorRegistration";
import FileDropzone from "../Common/FileDropzone";

const ReapplyMentor = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [keyArr, setKeyArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();
  const currentValidationSchema = MentorRegistration[2];
  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
    defaultValues: {
      experience: " ",
      detailedExperience: "",
    },
  });
  const { control, handleSubmit, reset, formState } = methods;
  const { errors } = formState;

  function getFileExtension(filename) {
    const a = filename.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
      return "";
    }
    return a.pop();
  }
  // eslint-disable-next-line
  const callAPIs = async (file) => {
    const { name, type } = file;
    const id = uuidv4();
    const extension = getFileExtension(name);
    const key = `${id}.${extension}`; // uuidv4()
    const signedURL = `/api/auth/mentorupload?type=${encodeURIComponent(
      type,
    )}&key=${key}`;

    const keysArray = keyArr;
    keysArray.push(key);
    setKeyArr([...keysArray]);
    // eslint-disable-next-line
    const { data: awsURL } = await axios.get(signedURL);

    await axios.put(awsURL, file, {
      headers: {
        "content-type": type,
      },
    });
  };

  const uploadFiles = async (acceptedFiles) => {
    setLoading(true);
    const fileUploadStatus = [];
    for (let x = 0; x < acceptedFiles.length; x++) {
      const acceptedArray = uploadedFiles;
      acceptedArray.push(acceptedFiles[x]);
      setUploadedFiles([...acceptedArray]);
      fileUploadStatus.push(callAPIs(acceptedFiles[x]));
    }

    try {
      await Promise.all(fileUploadStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const dropzoneConfig = {
    multiple: true,
    maxSize: 52428800,
    accept:
      "image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword",
    onDropAccepted: uploadFiles,
    onDropRejected: () => {
      enqueueSnackbar("File type not accepted");
    },
    disabled: loading,
  };

  const removeFile = async (value) => {
    const array = uploadedFiles;
    const arrayTwo = keyArr;
    const valueToBeDeleted = arrayTwo[value];
    if (value >= -1) {
      array.splice(value, 1);
      arrayTwo.splice(value, 1);
      const deleteURL = `/api/auth/mentordelete?key=${valueToBeDeleted}`;
      try {
        await axios.get(deleteURL);
      } catch (err) {
        if (err.response.status === 500) {
          enqueueSnackbar("Error in deletion!");
        }
      }
    }
    setUploadedFiles([...array]);
    setKeyArr([...arrayTwo]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (values) => {
    try {
      axios({
        method: "POST",
        url: "/api/requests/mentorreapplication",
        data: {
          values,
          uploadedFiles,
          keyArr,
        },
      })
        .then(() => {
          axios({
            method: "put",
            url: "/api/requests/mentorreapplication",
          }).then(() => {
            mutate(`/profile/${userId}/friendInfo`);
            enqueueSnackbar("You have successfully sent your reapplication!");
            setOpen(false);
            setUploadedFiles([]);
            setKeyArr([]);
            reset();
          });
        })
        .catch((error) => {
          enqueueSnackbar("An error has occurred!");
          throw error;
        });
    } catch (err) {
      enqueueSnackbar("An error has occurred!");
      throw err;
    }
  };
  const { data: myInfo } = useSWR(`/profile/${userId}/friendInfo`);
  if (!myInfo)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: "1.2rem",
      }}
    >
      {myInfo.isActive === "2" ? (
        <Alert severity="error">
          Your previous mentor application has been disapproved. You will still
          be unable to receive mentor requests unless you are a verified mentor.
          To reapply, click the button below.{" "}
          <Button
            style={{ margin: "0 auto", display: "flex", fontSize: "16px" }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Reapply as mentor
          </Button>
        </Alert>
      ) : null}

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Mentor Reapplication</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: "-1.5em" }}>
            <DialogContent>
              <DialogContentText>
                Reapply as a mentor by filling out the following details
              </DialogContentText>

              <FormControl fullWidth variant="outlined">
                <Controller
                  control={control}
                  name="experience"
                  render={({ field: { onChange, value } }) => (
                    <FormControl variant="filled">
                      <InputLabel>
                        Do you have any experience in mentoring?
                      </InputLabel>

                      <Select onChange={onChange} value={value}>
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </Select>
                      {setResponse(value)}
                      <FormHelperText style={{ color: "red" }}>
                        {errors.experience && errors.experience.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                {response === "yes" || response === "" ? (
                  <Controller
                    control={control}
                    name="detailedExperience"
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        id="filled-basic"
                        label="If yes, what kind of mentoring?"
                        multiline
                        rows={2}
                        onChange={onChange}
                        value={value}
                        error={
                          errors.detailedExperience &&
                          errors.detailedExperience.message
                        }
                        helperText={
                          errors.detailedExperience
                            ? errors.detailedExperience.message
                            : ""
                        }
                      />
                    )}
                  />
                ) : null}
                <Typography style={{ fontSize: "12px" }}>
                  Upload supporting documents here (.pdf, .docx, .png, .jpg)
                </Typography>
                <FileDropzone
                  useDropzoneProps={dropzoneConfig}
                  dropzoneTitle="Drag and drop files here or click to add."
                />
                {loading && <LinearProgress />}

                {uploadedFiles.map((elem) => (
                  <Grid
                    item
                    xs={2}
                    key={uploadedFiles.indexOf(elem)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography style={{ fontSize: "12px" }}>
                      {elem.name}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        removeFile(uploadedFiles.indexOf(elem));
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
export default ReapplyMentor;
