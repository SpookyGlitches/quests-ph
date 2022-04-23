import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Image from "next/image";

export default function BadgeModal(props) {
  const {
    badgeModalState: { open, notificationMessage, badgeDetails },
    setOpen,
  } = props;
  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      <DialogTitle color="primary" align="center">
        {badgeDetails.title}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 5,
          }}
        >
          <Image
            src={`/badges/${badgeDetails.image}`}
            height={150}
            alt="badge image"
            width={150}
          />
        </Box>
        <Typography
          align="center"
          variant="body2"
          sx={{ fontWeight: "medium", mt: 3 }}
        >
          {badgeDetails.description}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          sx={{ fontWeight: "medium", mt: 1 }}
        >
          {notificationMessage}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ m: 0 }}>
        <Button variant="text" onClick={setOpen} fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
