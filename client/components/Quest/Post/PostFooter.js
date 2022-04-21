import { Box, Typography } from "@mui/material";
import EmojiStack from "./EmojisStack";

export default function PostFooter(props) {
  const { commentsCount, postReacts } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {postReacts && (
          <EmojiStack spacing={-1} height={30} width={30} reacts={postReacts} />
        )}
      </Box>
      <Typography variant="caption">{commentsCount || 0} comments</Typography>
    </Box>
  );
}
