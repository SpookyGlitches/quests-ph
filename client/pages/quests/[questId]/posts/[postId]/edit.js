import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Paper } from "@mui/material";
import { useSnackbar } from "notistack";
import QuestLayout from "../../../../../components/Layouts/QuestLayout";
import PostForm from "../../../../../components/Quest/Post/PostForm";
import FilesForm from "../../../../../components/Quest/Post/Files/FilesForm";
import AppLayout from "../../../../../components/Layouts/AppLayout";
import PopConfirm from "../../../../../components/Common/PopConfirm";

export default function EditPostPage() {
  const router = useRouter();
  const { questId, postId } = router.query;

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [confirmModalState, setConfirmModalState] = useState({
    handleOk: () => {},
    open: false,
  });

  const { enqueueSnackbar } = useSnackbar();
  const { data: post } = useSWR(
    questId && postId ? `/quests/${questId}/posts/${postId}` : null,
  );

  const getUploadedFiles = async () => {
    try {
      const { data } = await axios.get(
        `/api/quests/${questId}/posts/${postId}/postFiles`,
      );
      setUploadedFiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (router.isReady) getUploadedFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const onSubmit = async (values) => {
    try {
      await axios.put(`/api/quests/${questId}/posts/${postId}`, {
        ...values,
      });
      router.back();
      enqueueSnackbar("Successfully updated.");
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/api/quests/${questId}/posts/${post.postId}`);
      router.push(`/quests/${questId}/posts`);
    } catch (err) {
      console.error(err);
    }
  };
  const openDeleteModal = () => {
    setConfirmModalState({
      open: true,
      handleOk: deletePost,
    });
  };

  const closeModal = () => {
    setConfirmModalState((prev) => ({ ...prev, open: false }));
  };

  if (!post) {
    return <div>Loading</div>;
  }

  return (
    <Paper>
      <PostForm
        post={post}
        onSubmit={onSubmit}
        isUpdating
        deletePost={() => openDeleteModal()}
      >
        <FilesForm
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </PostForm>
      <PopConfirm
        open={confirmModalState.open}
        title="Are you sure you want to delete this post?"
        subtitle="This action is irreversible. Proceed?"
        handleOk={confirmModalState.handleOk}
        handleCancel={closeModal}
      />
    </Paper>
  );
}

EditPostPage.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
