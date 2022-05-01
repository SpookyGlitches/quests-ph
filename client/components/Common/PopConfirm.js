import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function PopConfirm(props) {
  const { handleOk, handleCancel, open, subtitle, title, okText, cancelText } =
    props;

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle color="primary">
        {title || "Are you sure you want to do this?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {subtitle || "This action is irreversible. Proceed?"}
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleCancel}>{cancelText || "Cancel"}</Button>
          <Button
            onClick={() => {
              handleOk();
              handleCancel();
            }}
          >
            {okText || "Proceed"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
