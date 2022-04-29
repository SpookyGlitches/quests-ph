import { Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import CustomAvatar from "../../Common/CustomAvatar";

export default function CreatePost(props) {
  const { onCreatePostClick, rootStyles, disabled } = props;
  const session = useSession();
  const userId = session?.data?.user?.userId;

  const { data: myInfo } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );

  const createNewPost = (event) => {
    if (disabled) {
      return;
    }
    onCreatePostClick(event);
  };
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        paddingY: 2,
        paddingX: 2,
        gap: 1,
        ...rootStyles,
      }}
    >
      <CustomAvatar
        displayName={myInfo?.displayName || "QU"}
        image={myInfo?.image}
      />
      <Paper
        sx={{
          flexGrow: 1,
          marginLeft: 1,
          height: 50,
          paddingX: 1,
          display: "flex",
          cursor: !disabled && "pointer",
          alignItems: "center",
          backgroundColor: disabled && "grey.200",
        }}
        onClick={createNewPost}
      >
        <Typography variant="body2">Create a new post</Typography>
      </Paper>
    </Paper>
  );
}
