import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";

export default function PostBody(props) {
  const { title, body, postFiles, onClick, onSpecificPost } = props;
  const openImage = (event, link) => {
    // copy pasta  https://stackoverflow.com/questions/45046030/maintaining-href-open-in-new-tab-with-an-onclick-handler-in-react
    event.stopPropagation();
    const newWindow = window.open(link, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{ cursor: onSpecificPost ? "auto" : "pointer" }}
        onClick={onClick}
      >
        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
          {body}
        </Typography>
      </Box>
      <div>
        {postFiles && postFiles.length !== 0 && (
          <Carousel
            autoPlay={false}
            sx={{
              zIndex: 1,
              width: "100%",
              height: "auto",
            }}
            indicators={false}
          >
            {postFiles.map((item) => {
              const link = `${process.env.NEXT_PUBLIC_FILES_BASE_LINK}/${item.key}`;
              return (
                <Box
                  sx={{
                    position: "relative",
                    height: "400px",
                    maxHeight: "400px",
                    backgroundColor: "grey.200",
                    cursor: "pointer",
                  }}
                  key={item.key}
                >
                  <Image
                    layout="fill"
                    onClick={(event) => openImage(event, link)}
                    objectFit="contain"
                    alt="image"
                    src={link}
                  />
                </Box>
              );
            })}
          </Carousel>
        )}
      </div>
    </Box>
  );
}
