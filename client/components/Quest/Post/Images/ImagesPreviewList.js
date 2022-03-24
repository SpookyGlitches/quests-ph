import {
  ImageList,
  Box,
  ImageListItem,
  Checkbox,
  Button,
  Typography,
  ImageListItemBar,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { alpha } from "@mui/material/styles";

export default function ImagesPreviewList({ files }) {
  const [deleteAllChecked, setDeleteAllChecked] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const toggleDeleteCheckBox = () => {
    if (!deleteAllChecked) {
      setImagesToDelete(files);
    } else {
      setImagesToDelete([]);
    }
    setDeleteAllChecked((prev) => !prev);
  };
  // const toggleIsDeleting = () => {
  //   setIsDeleting((prev) => !prev);
  // };
  const toggleDeleteImageCheckBox = (event, item) => {
    const exists = imagesToDelete.includes(item);
    if (!exists) {
      setImagesToDelete([...imagesToDelete, item]);
    } else {
      const filtered = imagesToDelete.filter((x) => x !== item);
      setImagesToDelete(filtered);
    }
  };

  const isToggled = (id) => {
    return imagesToDelete.includes(id);
  };

  const removeImages = () => {
    // const filtered = files.filter((x) => !imagesToDelete.includes(x.id));
    // setFiles(filtered);
    setDeleteAllChecked(false);
    setImagesToDelete([]);
  };

  return (
    <div>
      <ImageList
        sx={{ width: "100%", maxHeight: 300 }}
        cols={3}
        rowHeight={150}
      >
        {files.map((item) => (
          <ImageListItem key={item}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_LINK}/${item.path}`}
              alt={item}
              layout="fill"
              objectFit="cover"
            />
            <ImageListItemBar
              position="bottom"
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.common.white, 0.6),
              }}
              actionIcon={
                <Checkbox
                  size="small"
                  sx={{
                    padding: 0.5,
                  }}
                  onChange={(event) => toggleDeleteImageCheckBox(event, item)}
                  checked={isToggled(item)}
                />
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button onClick={removeImages}>
          Remove {imagesToDelete.length} images
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            onChange={toggleDeleteCheckBox}
            size="small"
            checked={deleteAllChecked}
          />
          <Typography variant="body2">Remove All</Typography>
        </Box>
      </Box>
    </div>
  );
}
