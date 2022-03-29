import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

export default function FilePreviewList({
  files,
  toggleDeleteFileCheckbox,
  isToggled,
}) {
  const openFile = (key) => {
    // copy pasta  https://stackoverflow.com/questions/45046030/maintaining-href-open-in-new-tab-with-an-onclick-handler-in-react
    const newWindow = window.open(
      `${process.env.NEXT_PUBLIC_FILES_BASE_LINK}/${key}`,
      "_blank",
      "noopener,noreferrer",
    );
    if (newWindow) newWindow.opener = null;
  };

  const renderCheckBox = (key) => {
    return isToggled(key) ? (
      <CheckBoxRoundedIcon
        color="primary"
        onClick={() => toggleDeleteFileCheckbox(key)}
      />
    ) : (
      <CheckBoxOutlineBlankRoundedIcon
        onClick={() => toggleDeleteFileCheckbox(key)}
      />
    );
  };

  const renderActions = (error, key) => {
    return !error ? (
      <div>
        <IconButton edge="end" size="small">
          {renderCheckBox(key)}
        </IconButton>
        <IconButton edge="end" onClick={() => openFile(key)} size="small">
          <VisibilityRoundedIcon />
        </IconButton>
      </div>
    ) : (
      ""
    );
  };

  const renderSecondary = (error, mimeType) => {
    return !error ? (
      <Typography variant="caption">{mimeType}</Typography>
    ) : (
      <Typography variant="caption" color="error">
        {error.message || "Something went wrong. Try uploading again."}
      </Typography>
    );
  };

  return (
    <div>
      <List dense>
        {files.map(({ name, key, mimeType, error }) => (
          <ListItem key={key} secondaryAction={renderActions(error, key)}>
            <ListItemAvatar>
              <Avatar>
                <FilePresentRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: {
                      xs: "60%",
                      sm: "85%",
                    },
                    wordBreak: "break-all",
                  }}
                >
                  {name}
                </Typography>
              }
              secondary={renderSecondary(error, mimeType)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
