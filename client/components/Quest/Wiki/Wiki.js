import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Plate } from "@udecode/plate-core";
import { plugins } from "../../../config/plate/plugins";
import Toolbar from "./Toolbar";

const initialValue = [
  {
    type: "p",
    children: [{ text: "" }],
  },
];

const Wiki = () => {
  const router = useRouter();
  const { questId } = router.query;
  const [plateValue, setPlateValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const { data: quest } = useSWR(questId ? `/quests/${questId}` : null);

  useEffect(() => {
    if (quest && quest.wiki) {
      setPlateValue(JSON.parse(quest.wiki));
    }
  }, [quest]);

  const onChangeDebug = (newPlateValue) => {
    setPlateValue(newPlateValue);
  };
  const toggleEditButton = async (event) => {
    event.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`/api/quests/${quest.questId}/wiki`, {
          wiki: JSON.stringify(plateValue),
        });
      } catch (err) {
        console.error(err);
      }
    }
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
        minHeight: "30rem",
        padding: "2rem",
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
