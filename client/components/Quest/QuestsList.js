import { Box } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import QuestItem from "./QuestItem";
import WoopModal from "./WoopModal";

export default function QuestsList({ url }) {
  const router = useRouter();
  const { data: quests } = useSWR(url);
  const [modalDetails, setModalDetails] = useState({
    loading: false,
    title: "Join Quest",
    open: false,
    statement: {
      outcome: "",
      obstacle: "",
      plan: "",
      wish: "",
    },
    questId: null,
  });

  const toggleModal = (event, quest) => {
    event.stopPropagation();
    setModalDetails((prev) => ({
      ...prev,
      statement: {
        ...prev.statement,
        wish: quest?.wish,
      },
      open: !prev.open,
      questId: quest?.questId,
    }));
  };

  const navigateToQuest = (questUrl) => {
    router.push(questUrl);
  };

  const submitForm = async (values) => {
    try {
      await axios.post(`/api/quests/${modalDetails.questId}/partyMembers`, {
        ...values,
        role: "MENTEE",
      });
      setModalDetails((prev) => ({
        ...prev,
        open: false,
      }));
      navigateToQuest(`/quests/${modalDetails.questId}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!quests) {
    return <div>Loading</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
      }}
    >
      {quests.map((item) => (
        <QuestItem
          key={item.questId}
          quest={item}
          onJoinClick={(event) => toggleModal(event, item)}
          navigate={() => {
            navigateToQuest(`/quests/${item.questId}`);
          }}
        />
      ))}
      <WoopModal
        handleOk={submitForm}
        handleCancel={toggleModal}
        okText="Join Quest"
        details={modalDetails}
      />
    </Box>
  );
}
