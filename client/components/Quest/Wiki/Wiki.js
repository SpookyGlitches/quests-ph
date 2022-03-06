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
      minHeight: "10rem",
      width: "100%",
      backgroundColor: "white",
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Plate
        editableProps={editableProps}
        value={plateValue}
        plugins={plugins}
        onChange={onChangeDebug}
      >
        <Toolbar />
      </Plate>
    </Box>
  );
};

export default Wiki;
