import { format } from "date-fns";
import { Typography, Box, Paper, Button, Grid } from "@mui/material";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Category from "../Icons/Category";
import getCategoryColor from "../../helpers/categoryColor";

export default function QuestItem({ onJoinClick, quest, onClick }) {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "auto",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Grid container>
        <Grid item xs={12} md={3} lg={2}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: getCategoryColor(quest.category),
              minHeight: 100,
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Category
              category={quest.category}
              rootStyles={{ color: "white" }}
            />
            <Typography variant="caption" color="white">
              {quest.category}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Grid
            container
            sx={{
              paddingY: 1,
              height: "100%",
              paddingX: 2,
            }}
            id="innerGrid"
          >
            <Grid item xs={12} md>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
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
              </Box>
            </Grid>
            {quest.canJoin && (
              <Grid item xs={12} md={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "flex-end",
                      md: "center",
                    },
                    height: "100%",
                    alignItems: "center",
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
        </Grid>
      </Grid>
    </Paper>
  );
}
