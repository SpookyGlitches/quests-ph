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
// eslint-disable-next-line
import FileUpload from "./FileUpload";
// eslint-disable-next-line
import FileDropzone from "../Common/FileDropzone";

export default function Step3({ uploadedFiles, setUploadedFiles }) {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const {
    formState: { errors },
  } = useFormContext(); //
  const fileArr = [];
  const uploadFiles = async (acceptedFiles) => {
    // setLoading(true);
    // eslint-disable-next-line
    const fileUploadStatus = [];
    // eslint-disable-next-line
    const accepted = [];
    // eslint-disable-next-line
    const rejected = [];

    for (let x = 0; x < acceptedFiles.length; x++)
      fileArr.push(acceptedFiles[x]);
    // console.log(acceptedFiles[x]);
    //   fileUploadStatus.push(callAPIs(acceptedFiles[x]));

    // get only files that doesnt have an error
    try {
      setUploadedFiles(fileArr);
      console.log(fileArr);
      // const promises = await Promise.all(fileUploadStatus);

      // promises.forEach((item) => {
      //   if (item.error) rejected.push(item);
      //   else accepted.push(item);
      // });

      // setRejectedFiles((prev) => [...prev, ...rejected]);
      // setUploadedFiles((prev) => [...prev, ...accepted]);
    } catch (err) {
      console.error(err);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const dropzoneConfig = {
    multiple: true,
    maxSize: 52428800,
    accept:
      "image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword",
    onDropAccepted: uploadFiles,
    onDropRejected: () => {
      console.log("lol");
    },
    // disabled: loading,
  };

  const removeFile = (value) => {
    console.log(value);
    const array = uploadedFiles;
    const index = array.indexOf(value);
    if (index >= -1) {
      array.splice(index, 1);
    }
    setUploadedFiles([...array]);
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
      <Grid container spacing={1} alignItems="flex-end">
        {uploadedFiles.map((elem) => (
          <Grid
            item
            xs={2}
            key={uploadedFiles.indexOf(elem)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography style={{ fontSize: "12px" }}>{elem.name}</Typography>
            <Button
              sx={{ ml: "-1em" }}
              size="small"
              onClick={() => {
                removeFile(uploadedFiles.indexOf(elem));
              }}
            >
              <CloseRoundedIcon />
            </Button>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
