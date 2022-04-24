import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { Plate } from "@udecode/plate-core";
import { LoadingButton } from "@mui/lab";
import { plugins } from "../../../config/plate/plugins";
import Toolbar from "./Toolbar";
import { QuestContext } from "../../../context/QuestContext";
import { PartyMemberContext } from "../../../context/PartyMemberContext";

const initialValue = [
  {
    type: "p",
    children: [{ text: "" }],
  },
];

const Wiki = () => {
  const [plateValue, setPlateValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useSWRConfig();

  const partyMember = useContext(PartyMemberContext);
  const quest = useContext(QuestContext);
  const { questId, wiki, completedAt } = quest;

  useEffect(() => {
    if (wiki) {
      setPlateValue(JSON.parse(wiki));
    }
  }, [wiki]);

  const onChangeDebug = (newPlateValue) => {
    setPlateValue(newPlateValue);
  };

  const updateWiki = async () => {
    try {
      setLoading(true);
      const stringifiedValue = JSON.stringify(plateValue);
      await axios.put(`/api/quests/${quest.questId}/wiki`, {
        wiki: stringifiedValue,
      });

      mutate(
        `/quests/${questId}`,
        (questData) => ({ ...questData, wiki: stringifiedValue }),
        {
          revalidate: false,
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const toggleEditButton = async (event) => {
    event.preventDefault();
    if (isEditing) {
      await updateWiki();
    }
    setIsEditing((prev) => !prev);
  };

  const editableProps = {
    placeholder: isEditing ? "Type something" : "",
    style: {
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
        <Typography variant="h5" color="primary" sx={{}}>
          Wiki
        </Typography>
        {partyMember.role !== "MENTEE" && (
          <LoadingButton
            disabled={Boolean(completedAt)}
            onClick={toggleEditButton}
            loading={loading}
            loadingIndicator="Saving..."
          >
            {isEditing ? "Save" : "Edit"}
          </LoadingButton>
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
