import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function EndResults(props) {
  const { title, subtitle, imageWidth, imageHeight } = props;
  return (
    <Box
      sx={{
        my: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: imageHeight || 150,
          width: imageWidth || 250,
        }}
      >
        <Image
          src="/endOfList.svg"
          alt="end of results"
          objectFit="contain"
          layout="fill"
        />
      </Box>
      <div>
        {title || (
          <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
            You have reached the end of the list.
          </Typography>
        )}

        {subtitle}
      </div>
    </Box>
  );
}
