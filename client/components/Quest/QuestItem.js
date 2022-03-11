import { Typography, Box, Button, Grid } from "@mui/material";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import StyledPaper from "../Common/StyledPaper";
export default function QuestItem({ hasJoined, onJoinClick }) {
  return (
    <StyledPaper sx={{ width: "100%", height: "auto", overflow: "hidden" }}>
      <Grid container sx={{ minHeight: "6rem" }}>
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              backgroundColor: "primary.main",
              height: "100%",
              minHeight: "5rem",
            }}
          ></Box>
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
            <Typography variant="h6">
              Do Keto Diet Three Times A Week
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ScheduleRoundedIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">November 8 - December 4</Typography>
            </Box>
          </Box>
        </Grid>
        {!hasJoined && (
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
