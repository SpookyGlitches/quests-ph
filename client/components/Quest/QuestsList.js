import useSWR from "swr";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import QuestItem from "./QuestItem";
import WoopModal from "./WoopModal";
import LoadMore from "../Common/LoadMore";

function QuestPage({
  url,
  take,
  skip,
  search,
  setHasMore,
  toggleModal,
  navigateToQuest,
  setLoading,
}) {
  const withSearch = search ? `&search=${search}` : "";
  const isValidUrl = url && take && skip >= 0;
  const fullUrl = `${url}?take=${take}&skip=${skip}${withSearch}`;
  const { data: quests } = useSWR(isValidUrl ? fullUrl : null);

  if (!quests) {
    setLoading(true);
    return <div>Loading</div>;
  }

  if (quests.length < take) {
    setHasMore(false);
  }
  setLoading(false);

  return quests.map((quest) => {
    return (
      <QuestItem
        key={quest.questId}
        onClick={() => navigateToQuest(`/quests/${quest.questId}`)}
        onJoinClick={(event) => toggleModal(event, quest)}
        quest={quest}
      />
    );
  });
}

export default function QuestsList({ url, take, search }) {
  const searchText = search && search.length ? search : undefined;
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
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

  const navigateToQuest = (questUrl) => {
    router.push(questUrl);
  };
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

  const loadMore = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <Stack spacing={3}>
        {[...Array(count).keys()].map((i) => {
          return (
            <QuestPage
              url={url}
              take={take}
              search={searchText}
              setLoading={setLoading}
              setHasMore={setHasMore}
              toggleModal={toggleModal}
              navigateToQuest={navigateToQuest}
              skip={i}
              key={i}
            />
          );
        })}
        <LoadMore hasMore={hasMore} loading={loading} onClick={loadMore} />
      </Stack>

      <WoopModal
        handleOk={submitForm}
        handleCancel={toggleModal}
        okText="Join Quest"
        details={modalDetails}
      />
    </>
  );
}
