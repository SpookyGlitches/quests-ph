import {
  Box,
  Typography,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import useSWR from "swr";

import { format } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import capitalizeFirstLetterOnly from "../../../helpers/strings";

export default function Settings() {
  const router = useRouter();
  const { questId } = router.query;

  const [anchorSettings, setAnchorSettings] = useState(null);
  const [openSettingsPopper, setOpenSettingsPopper] = useState(false);

  const { data: quest } = useSWR(questId ? `/quests/${questId}` : null);
  const { data: partyMember } = useSWR(
    questId ? `/quests/${questId}/partyMembers/currentUser` : null,
  );

  const handleSettingsPopperClick = (event) => {
    setAnchorSettings(event.currentTarget);
    setOpenSettingsPopper(!openSettingsPopper);
  };

  const navigateToSettingsPage = () => {
    router.push(`/quests/${questId}/overview/edit-settings`);
  };

  const closePopper = () => {
    setOpenSettingsPopper(false);
  };

  if (!quest || !partyMember) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Paper
        sx={{
          padding: 3,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {partyMember.role === "PARTY_LEADER" && (
            <IconButton
              sx={{ position: "absolute", right: 0 }}
              onClick={handleSettingsPopperClick}
            >
              <MoreHorizRoundedIcon />
            </IconButton>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} lg={5}>
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
            <Grid item xs={12} lg={7}>
              {quest && (
                <Box>
                  <Typography variant="body2">
                    Estimated Start:{" "}
                    {format(new Date(quest.estimatedStartDate), "MMMM d, yyyy")}
                  </Typography>
                  <Typography variant="body2">
                    Estimated End:{" "}
                    {format(new Date(quest.estimatedEndDate), "MMMM d, yyyy")}
                  </Typography>
                  <Typography variant="body2">
                    {quest.completedAt
                      ? `Completed At: ${format(
                          new Date(quest.completedAt),
                          "MMMM d, yyyy",
                        )}`
                      : ""}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {partyMember.role === "PARTY_LEADER" && (
        <Menu
          MenuListProps={{
            dense: true,
          }}
          open={openSettingsPopper}
          anchorEl={anchorSettings}
          onClose={closePopper}
          transition
        >
          <MenuItem onClick={navigateToSettingsPage}>Edit</MenuItem>
        </Menu>
      )}
    </>
  );
}
