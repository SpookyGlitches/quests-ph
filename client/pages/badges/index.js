import { Paper, Typography, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import prisma from "../../lib/prisma";
import BadgeModal from "../../components/Common/BadgeModal";
import AppLayout from "../../components/Layouts/AppLayout";

export default function BadgesPage({ badges }) {
  const [badgeModalState, setBadgeModalState] = useState({
    open: false,
    notificationMessage: "",
    badgeDetails: {
      title: "",
      description: "",
      image: "",
    },
  });
  const handleBadgeClick = async (badge) => {
    setBadgeModalState({
      open: true,
      notificationMessage: ``,
      badgeDetails: {
        image: badge.image,
        description: badge.description,
        title: `${badge.name}`,
      },
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography color="primary" variant="h4">
        Obtainable Badges
      </Typography>
      <Typography variant="body1">
        Here is a list of all obtainable badges. We believe you can get all of
        them. You can do it!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          p: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {badges.map((badge) => (
          <Box
            key={badge.name}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              cursor: "pointer",
              gap: 5,
              height: 100,
              width: 100,
            }}
            onClick={() => handleBadgeClick(badge)}
          >
            <Image
              src={`/badges/${badge.image}`}
              height={100}
              alt="badge image"
              width={100}
            />
          </Box>
        ))}
      </Box>
      <BadgeModal
        badgeModalState={badgeModalState}
        setOpen={() => setBadgeModalState((prev) => ({ ...prev, open: false }))}
      />
    </Paper>
  );
}
BadgesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export async function getStaticProps() {
  const badges = await prisma.badge.findMany({
    where: {},
    select: {
      badgeId: true,
      description: true,
      name: true,
      image: true,
    },
  });
  return {
    props: {
      badges,
    },
  };
}
