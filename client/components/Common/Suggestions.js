import { Box, Typography, Stack } from "@mui/material";

export const People = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        textOverflow: "ellipsis",
        overflow: "hidden",
      }}
    >
      <Box component="div">
        <Typography
          variant="body2"
          sx={{
            width: "100%",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            // textDecorationLine: "line-through",
          }}
        />
        <Typography variant="caption" />
      </Box>
    </Box>
  );
};

export default function Suggestions() {
  return (
    <Box
      sx={{
        paddingX: "1rem",
        paddingY: "1rem",
        backgroundColor: "background.paper",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 1,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" color="primary" sx={{}}>
          Follow Suggestions
        </Typography>
        <Box sx={{ maxHeight: "10rem" }}>{/** no dat for now */}</Box>
      </Stack>
      {/* <Box sx={{ maxHeight: "10rem" }}>
        <DateCard />
      </Box> */}
    </Box>
  );
}
