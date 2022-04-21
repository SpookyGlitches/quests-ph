import {
  Box,
  Checkbox,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import FilePreviewList from "./FilePreviewList";
import FileDropzone from "../../../Common/FileDropzone";
import { QuestContext } from "../../../../context/QuestContext";

function getFileExtension(filename) {
  const a = filename.split(".");
  if (a.length === 1 || (a[0] === "" && a.length === 2)) {
    return "";
  }
  return a.pop();
}

export default function FilesForm({ uploadedFiles, setUploadedFiles }) {
  const { query } = useRouter();

  const [deleteAllChecked, setDeleteAllChecked] = useState(false);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { questId, completedAt } = useContext(QuestContext);

  const { postId } = query;

  const { data: partyMember } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );

  const toggleDeleteAllCheckBox = () => {
    setDeleteAllChecked((prev) => !prev);
    if (!deleteAllChecked) {
      setFilesToDelete(uploadedFiles.map((item) => item.key));
    } else {
      setFilesToDelete([]);
    }
  };

  const toggleDeleteFileCheckbox = (key) => {
    if (!filesToDelete.includes(key)) {
      setFilesToDelete([...filesToDelete, key]);
    } else {
      setFilesToDelete(
        filesToDelete.filter((deleteFileKey) => deleteFileKey !== key),
      );
    }
  };

  const isToggled = (key) => {
    return filesToDelete.includes(key);
  };

  const callAPIs = async (file) => {
    const { name, type } = file;
    const id = uuidv4();
    const extension = getFileExtension(name);
    const key = `quests/${questId}/partyMembers/${partyMember.partyMemberId}/${id}.${extension}`;
    const apiPresignedURL = `/api/quests/${questId}/posts/upload?type=${encodeURIComponent(
      type,
    )}&key=${key}`;
    try {
      // bit hacky
      const { data: awsURL } = await axios.get(apiPresignedURL);
      await axios.post(
        `/api/quests/${questId}/posts/${postId || null}/postFiles`,
        {
          name,
          key,
          mimeType: type,
        },
      );
      await axios.put(awsURL, file, {
        headers: {
          "content-type": type,
        },
      });
      return {
        name,
        key,
        mimeType: type,
        error: null,
      };
    } catch (err) {
      console.error(err);
      return { error: err, name, mimeType: type };
    }
  };

  const uploadFiles = async (acceptedFiles) => {
    setLoading(true);
    const fileUploadStatus = [];
    const accepted = [];
    const rejected = [];

    for (let x = 0; x < acceptedFiles.length; x++)
      fileUploadStatus.push(callAPIs(acceptedFiles[x]));

    // get only files that doesnt have an error
    try {
      const promises = await Promise.all(fileUploadStatus);

      promises.forEach((item) => {
        if (item.error) rejected.push(item);
        else accepted.push(item);
      });

      setRejectedFiles((prev) => [...prev, ...rejected]);
      setUploadedFiles((prev) => [...prev, ...accepted]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFiles = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/quests/${questId}/posts/null/postFiles`, {
        data: {
          filesToDelete,
        },
      });
      const newUploadedFiles = uploadedFiles.filter(
        (x) => !filesToDelete.includes(x.key),
      );
      setUploadedFiles(newUploadedFiles);
      setFilesToDelete([]);
      setDeleteAllChecked(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectedFiles = (fileRejections) => {
    const rejects = fileRejections.map(({ errors, file }) => ({
      error: errors[0] || new Error("Something went wrong."),
      name: file.name,
      mimeType: file.type,
    }));
    setRejectedFiles((prev) => [...prev, ...rejects]);
  };

  const dropzoneConfig = {
    multiple: true,
    maxSize: 52428800, // 50 mb maybe hehe
    accept: "image/*",
    onDropAccepted: uploadFiles,
    onDropRejected: handleRejectedFiles,
    disabled: loading,
  };

  if (!partyMember) {
    return <div>Loading</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {!completedAt && (
        <FileDropzone
          useDropzoneProps={dropzoneConfig}
          dropzoneTitle="Drag and drop images here or click to add."
        />
      )}
      {loading && <LinearProgress />}

      <FilePreviewList
        files={[...uploadedFiles, ...rejectedFiles]}
        isToggled={isToggled}
        toggleDeleteFileCheckbox={toggleDeleteFileCheckbox}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={removeFiles} size="small" disabled={loading}>
          Remove {filesToDelete.length} files
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            onChange={toggleDeleteAllCheckBox}
            size="small"
            checked={deleteAllChecked}
          />
          <Typography variant="body2">Remove All</Typography>
        </Box>
      </Box>
    </Box>
  );
}
