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

export default function Step3({ uploadedFiles, setUploadedFiles }) {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [keyArr, setKeyArr] = useState([]);
  const [accept, setAccept] = useState([]);
  const {
    formState: { errors },
  } = useFormContext(); //
  let fileArr = [];

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
    // const key2 = `quests/${questId}/partyMembers/${partyMember.partyMemberId}/${id}.${extension}`;
    const signedURL = `/api/auth/mentorupload?type=${encodeURIComponent(
      type,
    )}&key=${key}`;
    // const apiPresignedURL = `/api/auth/${questId}/posts/upload?type=${encodeURIComponent(
    //   type,
    // )}&key=${key}`;
    const keysArray = keyArr;
    keysArray.push(signedURL);
    setKeyArr(keysArray);
    // eslint-disable-next-line
    const { data: awsURL } = await axios.get(signedURL);
  };

  const uploadFiles = async (acceptedFiles) => {
    // setLoading(true);
    // eslint-disable-next-line
    const fileUploadStatus = [];
    // eslint-disable-next-line
    const accepted = [];
    // eslint-disable-next-line
    const rejected = [];

    for (let x = 0; x < acceptedFiles.length; x++) {
      const acceptedArray = accept;
      acceptedArray.push(acceptedFiles[x]);
      setAccept(acceptedArray);

      // fileArr.push(acceptedFiles[x]);
      // callAPIs(acceptedFiles[x]);
    }

    // get only files that doesnt have an error
    try {
      fileArr = accept;
      console.log(fileArr);
      setUploadedFiles([...fileArr]);
      // console.log(keyArr);
      // console.log(fileArr[0].type);
      // console.log(getFileExtension(fileArr[0].name));
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
      enqueueSnackbar("File type not accepted");
    },
    // disabled: loading,
  };

  const removeFile = (value) => {
    const array = uploadedFiles;
    const arraytwo = accept;
    if (value >= -1) {
      array.splice(value, 1);
      arraytwo.splice(value, 1);
    }
    setAccept([...array]);
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
      {/* <Grid container spacing={1}> */}
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
      {/* </Grid> */}
    </Stack>
  );
}
