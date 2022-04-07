import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Box, Typography, LinearProgress } from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

const FileUpload = (props) => {
  const { name } = props;
  // const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [filesToDelete, setFilesToDelete] = useState([]);
  // eslint-disable-next-line
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const { register, unregister, setValue } = useFormContext();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setValue(name, acceptedFiles, { shouldValidate: true });
    },
    accept:
      "image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword",
    onDropAccepted: (acceptedFiles) => {
      setLoading(true);
      // eslint-disable-next-line
      const fileUploadStatus = [];
      const accepted = [];
      const rejected = [];
      for (let x = 0; x < acceptedFiles.length; x++) {
        console.log(acceptedFiles);
        // fileUploadStatus.push(callAPIs(acceptedFiles[x]));
      }
      try {
        // const promises = await Promise.all(fileUploadStatus);

        // promises.forEach((item) => {
        //   if (item.error) rejected.push(item);
        //   else accepted.push(item);
        // });

        setRejectedFiles((prev) => [...prev, ...rejected]);
        // eslint-disable-next-line
        setUploadedFiles((prev) => [...prev, ...accepted]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    onDropRejected: (fileRejections) => {
      const rejects = fileRejections.map(({ errors, file }) => ({
        error: errors[0] || new Error("Something went wrong."),
        name: file.name,
        mimeType: file.type,
      }));
      setRejectedFiles((prev) => [...prev, ...rejects]);
    },
    multiple: true,
  });
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <>
      {" "}
      <Box
        {...getRootProps()}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          padding: 2,
          backgroundColor: "#e7e7e7",
          borderColor: "#cbcbcb",
          borderRadius: "5px",
        }}
      >
        <input {...props} {...getInputProps()} />

        <Typography variant="body2" align="center">
          Upload supporting document/s here
        </Typography>
        <CloudUploadRoundedIcon
          sx={{
            fontSize: 50,
          }}
        />
        <Typography variant="body2" align="center">
          Drag and drop files here, or click to add.
        </Typography>
      </Box>
      {loading && <LinearProgress />}
    </>
  );
};

export default FileUpload;
