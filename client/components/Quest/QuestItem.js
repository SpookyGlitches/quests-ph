import { format } from "date-fns";
import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useRouter } from "next/router";
import { useState } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import capitalizeFirstLetterOnly from "../../helpers/strings";
import getCategoryColor from "../../helpers/categoryColor";
import Category from "../Icons/Category";

export default function QuestItem({ onJoinClick, quest }) {
  const router = useRouter();
  const [modalDetails, setModalDetails] = useState({
    open: false,
    questItem: null,
  });

  const openQuestPreview = (questItem) => {
    setModalDetails({ open: true, questItem });
  };

  const navigateToQuest = (questItem) => {
    if (quest.joined) router.push(`/quests/${questItem.questId}`);
    else openQuestPreview(questItem);
  };

  const closeModal = () => {
    setModalDetails((prev) => ({ ...prev, open: false }));
  };

  const renderDifficultyIcon = (difficulty) => {
    const icons = [];
    let loops;
    let color;

    switch (difficulty) {
      case "EASY":
        loops = 1;
        color = "#168F03";
        break;
      case "MEDIUM":
        loops = 2;
        color = "#FFD500";
        break;
      case "HARD":
        loops = 3;
        color = "#d80400";
        break;
      default:
        loops = 0;
        color = "black";
        break;
    }

    for (let x = 0; x < loops; x++) {
      icons.push(<StarRoundedIcon fontSize="small" sx={{ color }} />);
    }

    return icons;
  };
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: "auto",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => navigateToQuest(quest)}
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
                      flexDirection: "column",
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

      <Dialog
        open={modalDetails.open}
        maxWidth="xs"
        fullWidth
        align="center"
        sx={{ minWidth: 300 }}
      >
        <DialogTitle color="primary" sx={{ position: "relative" }}>
          <IconButton
            sx={{ position: "absolute", right: 20 }}
            size="small"
            onClick={closeModal}
          >
            <CloseRoundedIcon />
          </IconButton>
          <Box>Quest Preview</Box>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                Wish
              </Typography>
              <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
                {modalDetails.questItem?.wish}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                Difficulty
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {renderDifficultyIcon(modalDetails.questItem?.difficulty)}
                  </Box>
                  <Typography variant="body2">
                    {capitalizeFirstLetterOnly(
                      modalDetails.questItem?.difficulty,
                    )}
                  </Typography>
                </Box>
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                Category
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Category category={modalDetails.questItem?.category} />
                <Typography variant="body2">
                  {capitalizeFirstLetterOnly(modalDetails.questItem?.category)}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                Start Date
              </Typography>
              <Typography variant="body2">
                {format(new Date(quest.estimatedStartDate), "MMMM d, yyyy")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                End Date
              </Typography>
              <Typography variant="body2">
                {format(new Date(quest.estimatedEndDate), "MMMM d, yyyy")}
              </Typography>
            </Box>
            {quest.completedAt && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Completed At
                </Typography>
                <Typography variant="body2">
                  {format(new Date(quest.completedAt), "MMMM d, yyyy")}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
