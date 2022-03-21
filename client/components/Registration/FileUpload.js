import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

const FileUpload = (props) => {
  const { name } = props;
  // const [count, setCount] = useState(0);
  const { register, unregister, setValue } = useFormContext();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setValue(name, acceptedFiles, { shouldValidate: true });
      // const formData = new FormData();
      // // eslint-disable-next-line
      // for (const file of acceptedFiles) formData.append("file", file);

      // const xhr = new XMLHttpRequest();
      // // eslint-disable-next-line
      // xhr.upload.onprogress = (event) => {
      //   // eslint-disable-next-line
      //   const percentage = parseInt((event.loaded / event.total) * 100);
      //   console.log(percentage); // Update progress here
      //   setCount(percentage);
      // };
      // xhr.onreadystatechange = () => {
      //   if (xhr.readyState !== 4) return;
      //   if (xhr.status !== 200) {
      //     console.log("error"); // Handle error here
      //   }
      //   console.log("success"); // Handle success here
      // };
      // xhr.open("POST", "http://ptsv2.com/t/khy9t-1647844836/post", true);
      // xhr.send(formData);
    },

    accept:
      "image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword",
    onDropAccepted: () => {
      console.log("Ok");
    },
    onDropRejected: () => {
      console.log("File type not supported");
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
    <Box
      {...getRootProps()}
      sx={{
        height: "8rem",

        backgroundColor: "#e7e7e7",
        borderColor: "#cbcbcb",
        borderRadius: "5px",
        borderWidth: "thin",
        cursor: "pointer",
      }}
    >
      <input {...props} {...getInputProps()} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          padding: "2rem",
        }}
      >
        <Typography sx={{ color: "#625e5c", fontSize: "12px" }}>
          Upload supporting document/s here
        </Typography>
        <CloudUploadRoundedIcon
          sx={{
            fontSize: "2rem",
          }}
        />
        <Typography sx={{ color: "#625e5c", fontSize: "10px" }}>
          Drag and drop some images/video here, or click to add.
        </Typography>
      </Box>
    </Box>
  );
};

export default FileUpload;
