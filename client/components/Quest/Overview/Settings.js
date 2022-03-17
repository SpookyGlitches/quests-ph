import {
  Box,
  Typography,
  IconButton,
  Popper,
  Grid,
  Fade,
  Button,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { QuestContext } from "../../../context/QuestContext";
import capitalizeFirstLetterOnly from "../../../helpers/strings";

export default function Settings() {
  const quest = useContext(QuestContext);
  const router = useRouter();

  const [anchorSettings, setAnchorSettings] = useState(null);
  const [openSettingsPopper, setOpenSettingsPopper] = useState(false);

  const handleSettingsPopperClick = (event) => {
    setAnchorSettings(event.currentTarget);
    setOpenSettingsPopper(!openSettingsPopper);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: "2rem",
        borderRadius: 2,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          sx={{ position: "absolute", right: 0 }}
          onClick={handleSettingsPopperClick}
        >
          <MoreHorizRoundedIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Box>
              <Typography variant="body2">
                Category: {capitalizeFirstLetterOnly(quest.category)}
              </Typography>
              <Typography variant="body2">
                Visibility: {capitalizeFirstLetterOnly(quest.visibility)}
              </Typography>
              <Typography variant="body2">
                Difficulty: {capitalizeFirstLetterOnly(quest.difficulty)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            {quest && quest.estimatedStartDate && (
              <Box>
                <Typography variant="body2">
                  Start Date:{" "}
                  {format(new Date(quest.estimatedStartDate), "MMMM d, yyyy  ")}
                </Typography>
                <Typography variant="body2">
                  End Date:{" "}
                  {format(new Date(quest.estimatedEndDate), "MMMM d, yyyy  ")}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Popper
        open={openSettingsPopper}
        anchorEl={anchorSettings}
        placement="right-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography variant="body1" color="black">
                <Link
                  href={`/quests/${router.query.questId}/overview/edit-settings`}
                  passHref
                >
                  <Button>Edit</Button>
                </Link>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
