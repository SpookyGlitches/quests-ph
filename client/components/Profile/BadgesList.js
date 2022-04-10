import { Box, IconButton, Typography, Popper, Fade } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { format } from "date-fns";
import StyledPaper from "../Common/StyledPaper";

const itemsToDisplay = 3;

export default function BadgesList({ userId }) {
  const [pagination, setPagination] = useState({
    start: 0,
    end: itemsToDisplay - 1,
  });
  const [openPopper, setOpenPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [givenAt, setGivenAt] = useState("");

  const getBadgeInfo = (value) => {
    axios({
      method: "get",
      url: `/api/profile/${userId}/getbadges`,
      params: {
        name: value,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setDescription(res.data[0]);
          setGivenAt(format(new Date(res.data[1]), "MMMM d, yyyy"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBadgeClick = (event) => {
    const badgeName = event.currentTarget.innerHTML;
    setName(badgeName);
    getBadgeInfo(badgeName);
    if (event.currentTarget) setAnchorEl(event.currentTarget);
    setOpenPopper((prev) => !prev);
    event.stopPropagation();
  };
  const { data: myBadges } = useSWR(`/profile/userbadges`);
  if (!myBadges) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  const temp = [];
  for (let x = 0; x < myBadges.length; x++) {
    temp.push(myBadges[x]);
  }

  const incrementPagination = () => {
    if (pagination.end - (temp.length - 1) === 0) return;
    if (pagination.end >= temp.length) return;
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
    const preview = temp.slice(pagination.start, pagination.end + 1);
    return preview.map((item) => (
      <Box
        key={`${item}`}
        onClick={handleBadgeClick}
        sx={{
          height: "5rem",
          cursor: "pointer",
          width: "5rem",
          backgroundImage: "url('/auth/banana.jpg')", // img url goes here
          borderRadius: "50%",
          fontSize: "12px",
          color: "transparent", // to hide the item.name below cz im using innerhtml ehehe
          textAlign: "center",
        }}
      >
        {item.name}
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
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="caption">{description}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    Given on {givenAt}
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
