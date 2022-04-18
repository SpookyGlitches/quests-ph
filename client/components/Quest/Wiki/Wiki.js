import { Box, Button, Paper, Typography } from "@mui/material";
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
  const { query } = useRouter();
  const { questId } = query;

  const [plateValue, setPlateValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const { data: quest, mutate: mutateQuest } = useSWR(
    questId ? `/quests/${questId}` : null,
  );

  const { data: partyMember } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );

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
        const stringifiedValue = JSON.stringify(plateValue);
        await axios.put(`/api/quests/${quest.questId}/wiki`, {
          wiki: stringifiedValue,
        });
        mutateQuest((questData) => ({ ...questData, wiki: stringifiedValue }), {
          revalidate: false,
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

  if (!quest || !partyMember) {
    return <div>Loading</div>;
  }

  return (
    <Paper
      sx={{
        overflow: "hidden",
        minHeight: "30rem",
        padding: 3,
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
        {partyMember.role !== "MENTEE" && (
          <Button onClick={toggleEditButton} sx={{ height: "auto" }}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        )}
      </Box>

      <Plate
        id="1"
        editableProps={editableProps}
        value={plateValue}
        plugins={plugins}
        onChange={onChangeDebug}
      >
        {isEditing && <Toolbar />}
      </Plate>
    </Paper>
  );
};

export default Wiki;
