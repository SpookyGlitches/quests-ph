import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { alpha } from "@mui/material/styles";

export default function FileDropzone({ uploadFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDropAccepted: (acceptedFiles) => {
      uploadFiles(acceptedFiles);
    },
    onDropRejected: (rejectedFiles) => {
      console.log(rejectedFiles);
    },
  });
  return (
    <Box
      {...getRootProps({})}
      sx={{
        height: "8rem",
        borderStyle: "dashed",
        borderColor: "#cbcbcb",
        borderRadius: 1,
        borderWidth: "thin",
        cursor: "pointer",
        backgroundColor: "background.default",
        // remove lang ni later siguro
        "&:hover": {
          borderColor: (theme) => theme.palette.common.black,
        },
        "&:focus-within": {
          borderColor: "primary.main",
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          color: "primary.main",
        },
      }}
    >
      <input {...getInputProps()} />
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
        <CloudUploadRoundedIcon
          sx={{
            fontSize: "3rem",
          }}
        />
        <Typography variant="body2" align="center">
          Drag and drop some images/video here, or click to add.
        </Typography>
      </Box>
    </Box>
  );
}
