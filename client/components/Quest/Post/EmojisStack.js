import { Stack, Typography, Box } from "@mui/material";
import Emoji from "./Emoji";

export default function EmojiStack({ reacts, height, width, spacing }) {
  const emojiTypes = [...new Set(reacts.map((item) => item.type))];
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Stack spacing={spacing} direction="row">
        {emojiTypes.map((type) => (
          <Emoji type={type} key={type} width={width} height={height} />
        ))}
      </Stack>
      {reacts.length > 0 && (
        <Typography variant="caption">{reacts.length}</Typography>
      )}
    </Box>
  );
}
