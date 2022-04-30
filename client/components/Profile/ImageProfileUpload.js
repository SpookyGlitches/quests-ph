import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import { useSnackbar } from "notistack";
import { useState } from "react";
import FileDropzone from "../Common/FileDropzone";
import CustomAvatar from "../Common/CustomAvatar";

function getFileExtension(filename) {
  const a = filename.split(".");
  if (a.length === 1 || (a[0] === "" && a.length === 2)) {
    return "";
  }
  return a.pop();
}

export default function ImageProfileUpload(props) {
  const { image, open, setOpen, displayName } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const { mutate } = useSWRConfig();

  const userId = session?.data?.user?.userId;

  const uploadImage = async (acceptedFile) => {
    setLoading(true);
    const file = acceptedFile[0];

    const { name, type } = file;
    const id = uuidv4();
    const extension = getFileExtension(name);
    const key = `profile/${userId}/${id}.${extension}`;

    try {
      const { data: awsURL } = await axios.get(
        `/api/users/${userId}/imageUpload?key=${encodeURIComponent(
          key,
        )}&type=${encodeURIComponent(type)}`,
      );

      await axios.put(`/api/users/${userId}/updateImage`, {
        image: key,
      });
      await axios.put(awsURL, file, {
        headers: {
          "content-type": type,
        },
      });

      mutate(`/profile/${userId}/friendInfo`);
      enqueueSnackbar("Successfully updated.");
    } catch (err) {
      enqueueSnackbar("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const dropzoneConfig = {
    multiple: false,
    maxSize: 52428800, // 50 mb maybe hehe
    accept: "image/jpeg, image/png",
    onDropAccepted: uploadImage,
  };
  const removeImage = async () => {
    try {
      await axios.put(`/api/users/${userId}/updateImage`, {
        image: null,
      });
      enqueueSnackbar("Successfully updated.");
      mutate(`/profile/${userId}/friendInfo`);
    } catch (err) {
      enqueueSnackbar("Something went wrong. Please try again.");
    }
  };

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle color="primary">Image Upload</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload a profile picture. Supported types are jpeg and png.
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            my: 2,
          }}
        >
          <CustomAvatar
            displayName={displayName}
            image={image}
            rootStyles={{ height: 100, width: 100 }}
          />
        </Box>
        <Box>
          <FileDropzone
            dropzoneTitle="Drag and drop the image here, or click to add."
            useDropzoneProps={dropzoneConfig}
          />
          {loading && <LinearProgress sx={{ mt: 2 }} />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={removeImage}>Reset</Button>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
