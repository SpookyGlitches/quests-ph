import * as React from "react";
import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  LinearProgress,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import FileDropzone from "../Common/FileDropzone";

export default function Step4({
  uploadedFiles,
  setUploadedFiles,
  keyArr,
  setKeyArr,
  setIsFinished,
}) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const {
    formState: { errors },
  } = useFormContext();

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
    setIsFinished(true);
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
      setIsFinished(false);
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

  return (
    <Stack spacing={1.5} sx={{ mt: "-1.5em" }}>
      <Controller
        name="experience"
        render={({ field: { onChange, value } }) => (
          <FormControl variant="filled" error={Boolean(errors.experience)}>
            <InputLabel>Do you have any experience in mentoring?</InputLabel>

            <Select onChange={onChange} value={value}>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {setResponse(value)}
            <FormHelperText>
              {errors.experience && errors.experience.message}
            </FormHelperText>
          </FormControl>
        )}
      />
      {response === "yes" || response === "" ? (
        <Controller
          name="detailedExperience"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="filled-basic"
              label="If yes, what kind of mentoring?"
              multiline
              rows={2}
              onChange={onChange}
              value={value}
              error={
                errors.detailedExperience && errors.detailedExperience.message
              }
              helperText={
                errors.detailedExperience
                  ? errors.detailedExperience.message
                  : ""
              }
            />
          )}
        />
      ) : (
        console.log("")
      )}

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
          <Typography style={{ fontSize: "12px" }}>{elem.name}</Typography>
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
    </Stack>
  );
}
