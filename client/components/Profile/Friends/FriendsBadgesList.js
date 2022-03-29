import { Box, IconButton, Typography, Popper, Fade } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";
import axios from "axios";
import StyledPaper from "../../Common/StyledPaper";

const itemsToDisplay = 3;

export default function FriendsBadgesList({ userId }) {
  const [badges, setBadges] = useState([]);
  const [pagination, setPagination] = useState({
    start: 0,
    end: itemsToDisplay - 1,
  });
  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [flag, setFlag] = useState(0);
  const handleBadgeClick = (event) => {
    if (event.currentTarget) setAnchorEl(event.currentTarget);
    setOpenPopper((prev) => !prev);
    event.stopPropagation();
  };

  if (userId !== "" && flag === 0) {
    axios
      .get("/api/profile/friends/friendbadges", {
        params: {
          userId,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const temp = [];
          for (let x = 0; x < response.data.length; x++) {
            temp.push(response.data[x].name);
          }
          setBadges(temp);
          setFlag(1);
        }
      });
  }

  const incrementPagination = () => {
    if (pagination.end - (badges.length - 1) === 0) return;
    if (pagination.end >= badges.length) return;
    setPagination((prev) => {
      return { start: prev.end + 1, end: prev.end + itemsToDisplay };
    });
  };
  const decrementPagination = () => {
    if (pagination.start <= 0) return;
    setPagination((prev) => {
      return {
        start: prev.start - itemsToDisplay,
        end: prev.end - itemsToDisplay,
      };
    });
  };

  const badgeItems = () => {
    const preview = badges.slice(pagination.start, pagination.end + 1);
    return preview.map((item) => (
      <Box
        key={`${item}`}
        onClick={handleBadgeClick}
        sx={{
          height: "5rem",
          cursor: "pointer",
          width: "5rem",
          backgroundColor: item,
          borderRadius: "50%",
        }}
      >
        {item}
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        paddingX: "1rem",
        paddingY: "1.5rem",
        width: "100%",
        borderRadius: 2,
      }}
    >
      <Typography sx={{ marginBottom: "1rem" }} align="center" variant="h6">
        Badges
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box>
          <IconButton onClick={decrementPagination}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: 6,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {badgeItems()}
        </Box>
        <Box>
          <IconButton onClick={incrementPagination}>
            <ArrowForwardIosRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        placement="top-end"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <StyledPaper
              sx={{
                bgcolor: "background.paper",
                overflow: "hidden",
                maxWidth: "14rem",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  minHeight: "0.8rem",
                }}
              />
              <Box sx={{ padding: 0.75 }}>
                <Typography variant="subtitle2">Early Bird</Typography>
                <Typography variant="caption">
                  Given to the early users of the Quests application
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    given March 2, 2021
                  </Typography>
                </Box>
              </Box>
            </StyledPaper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
