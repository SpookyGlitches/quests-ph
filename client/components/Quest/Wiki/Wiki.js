import { Box } from "@mui/material";
import { Plate } from "@udecode/plate";
import { useState } from "react";
import Toolbar from "./Toolbar";
import { plugins } from "../../../config/plate/plugins";

const initialValue = [
  {
    type: "p",
    children: [{ text: "hello" }],
  },
];

const Wiki = () => {
  const [plateValue, setPlateValue] = useState(initialValue);

  const onChangeDebug = (newPlateValue) => {
    setPlateValue(newPlateValue);
  };

  const editableProps = {
    placeholder: "Hello",
    style: {
      padding: "0.25rem 0.5rem",
      height: "100%",
      width: "100%",
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        padding: "1rem",
        minHeight: "25rem",
      }}
    >
      <Toolbar />
      <Plate
        editableProps={editableProps}
        value={plateValue}
        plugins={plugins}
        onChange={onChangeDebug}
      />
    </Box>
  );
};

export default Wiki;
