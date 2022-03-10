import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { plugins } from "../../../config/plate/plugins";
import Toolbar from "./Toolbar";
import { Plate } from "@udecode/plate-core";

const initialValue = [
  {
    type: "p",
    children: [{ text: "" }],
  },
];

const Wiki = () => {
  const [plateValue, setPlateValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onChangeDebug = (newPlateValue) => {
    setPlateValue(newPlateValue);
  };
  const toggleEditButton = (event) => {
    event.preventDefault();
    setIsEditing((prev) => !prev);
  };

  const editableProps = {
    placeholder: isEditing ? "Type something" : "",
    style: {
      padding: "0.25rem 0.5rem",
      height: "100%",
      width: "100%",
    },
    autoFocus: true,
    readOnly: !isEditing,
    contentEditable: !isEditing,
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        padding: "1rem",
        minHeight: "30rem",
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginTop: "0.5rem",
          marginBottom: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" color="primary" sx={{}}>
          Wiki
        </Typography>
        <Button onClick={toggleEditButton} sx={{ height: "auto" }}>
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Box>

      <Plate
        id="1"
        editableProps={editableProps}
        value={plateValue}
        plugins={plugins}
        onChange={onChangeDebug}
      >
        {isEditing && <Toolbar isEditing={isEditing} />}
      </Plate>
    </Box>
  );
};

export default Wiki;