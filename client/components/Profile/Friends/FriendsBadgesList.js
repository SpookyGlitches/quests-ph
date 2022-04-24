import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useState } from "react";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Image from "next/image";
import { format } from "date-fns";
import BadgeModal from "../../Common/BadgeModal";

const itemsToDisplay = 3;

export default function FriendsBadgesList({ userId }) {
  const [pagination, setPagination] = useState({
    start: 0,
    end: itemsToDisplay - 1,
  });
  const [badgeModalState, setBadgeModalState] = useState({
    open: false,
    notificationMessage: "",
    badgeDetails: {
      title: "",
      description: "",
      image: "",
    },
  });
  const getBadgeInfo = async (value) => {
    try {
      const { data } = await axios.get(
        `/api/profile/${userId}/getbadges?name=${value}`,
      );
      return new Date(data[1]);
    } catch {
      return new Date();
    }
  };

  const handleBadgeClick = async (badge) => {
    const createdAt = await getBadgeInfo(badge.name);
    setBadgeModalState({
      open: true,
      notificationMessage: `Given on ${format(createdAt, "MMMM d, yyyy")}`,
      badgeDetails: {
        image: badge.image,
        description: badge.description,
        title: `Gained ${badge.name} badge`,
      },
    });
  };
  const { data: friendBadges } = useSWR(
    userId ? `/profile/${userId}/friendbadges` : null,
  );
  if (!friendBadges) {
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
  for (let x = 0; x < friendBadges.length; x++) {
    temp.push(friendBadges[x]);
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
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          gap: 5,
          cursor: "pointer",
        }}
        onClick={() => handleBadgeClick(item)}
        key={JSON.stringify(item)}
      >
        <Image
          src={`/badges/${item.image}`}
          height={100}
          alt={`badge image of ${item.name}`}
          width={100}
        />
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
      <BadgeModal
        badgeModalState={badgeModalState}
        setOpen={() => setBadgeModalState((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
}
