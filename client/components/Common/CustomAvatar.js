import { Avatar } from "@mui/material";
import Image from "next/image";

export default function CustomAvatar({ displayName, image, rootStyles }) {
  return (
    <Avatar
      sx={{
        backgroundColor: "primary.main",
        ...rootStyles,
      }}
    >
      {image ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_FILES_BASE_LINK}/${image}`}
          height={300}
          objectFit="cover"
          alt="ok"
          width={300}
        />
      ) : (
        displayName.substring(0, 2).toUpperCase()
      )}
    </Avatar>
  );
}
