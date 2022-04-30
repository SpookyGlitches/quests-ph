import useSWR from "swr";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import QuestItem from "./QuestItem";
import WoopModal from "./WoopModal";
import LoadMore from "../Common/LoadMore";
import CustomCircularProgress from "../Common/CustomSpinner";

function QuestPage(props) {
  const { url, skip, searchParams, setHasMore, toggleModal, setLoading } =
    props;

  const queryString = new URLSearchParams({ ...searchParams, skip }).toString();
  const { data: quests, isValidating } = useSWR(
    url ? `${url}?${queryString}` : null,
  );

  useEffect(() => {
    setLoading(isValidating);

    if (!quests) {
      return;
    }

    const hasMore = quests.length >= searchParams.take;
    setHasMore(hasMore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quests, isValidating]);

  if (!quests) {
    return <CustomCircularProgress sx={{ minHeight: 100 }} />;
  }

  return quests.map((quest) => {
    return (
      <QuestItem
        key={quest.questId}
        onJoinClick={(event) => toggleModal(event, quest)}
        quest={quest}
      />
    );
  });
}

export default function QuestsList({ url, searchParams }) {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setCount(1);
    setHasMore(false);
    setLoading(false);
  }, [searchParams, url]);

  return (
    <>
      <Stack spacing={3}>
        {[...Array(count).keys()].map((i) => {
          return (
            <QuestPage
              url={url}
              searchParams={searchParams}
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
        okText="Join"
        details={modalDetails}
      />
    </>
  );
}
