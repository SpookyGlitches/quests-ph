import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import PostForm from "../../../../components/Quest/Post/PostForm";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import FilesForm from "../../../../components/Quest/Post/Files/FilesForm";

export default function Create() {
  const router = useRouter();
  const { questId } = router.query;
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onSubmit = async (values) => {
    const newlyUploadedFiles = [];

    uploadedFiles.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(item, "error") && !item.error) {
        newlyUploadedFiles.push({ key: item.key });
      }
    });

    try {
      await axios.post(`/api/quests/${questId}/posts`, {
        ...values,
        files: newlyUploadedFiles, // array of object with file keys
      });
      router.push(`/quests/${questId}/posts`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostForm onSubmit={onSubmit} isUpdating={false}>
      <FilesForm
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
    </PostForm>
  );
}

Create.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};
