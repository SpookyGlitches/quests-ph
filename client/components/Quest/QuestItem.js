import { format } from "date-fns";
import { Typography, Box, Button, Grid } from "@mui/material";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import StyledPaper from "../Common/StyledPaper";

export default function QuestItem({ onJoinClick, quest, navigate }) {
  return (
    <StyledPaper
      sx={{
        width: "100%",
        height: "auto",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={navigate}
    >
      <Grid container sx={{ minHeight: "6rem" }}>
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              height: "100%",
              minHeight: "5rem",
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              paddingX: "1rem",
              paddingY: "1.5em",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">{quest.wish}</Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ScheduleRoundedIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                {format(new Date(quest.estimatedStartDate), "MMMM d")} -{" "}
                {format(new Date(quest.estimatedEndDate), "MMMM d")}
              </Typography>
            </Box>
          </Box>
        </Grid>
        {quest.canJoin && (
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: ["end", null, "center"],
                width: "100%",
                height: "100%",
                padding: "0.5rem",
                paddingBottom: "1rem,",
              }}
            >
              <Button
                size="small"
                endIcon={<ArrowForwardIosRoundedIcon />}
                onClick={onJoinClick}
              >
                Join
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </StyledPaper>
  );
}
