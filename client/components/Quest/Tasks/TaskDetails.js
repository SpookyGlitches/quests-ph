import {
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SportsScoreRoundedIcon from "@mui/icons-material/SportsScoreRounded";

const TaskDetails = ({
  handleOk,
  handleCancel,
  open,
  points,
  dueAt,
  description,
  questTaskid,
  memberId,
  title,
}) => {
  return (
    <form>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxHeight: 435,
          },
        }}
        maxWidth="xs"
        open={open}
      >
        <Box
          sx={{
            bgcolor: "#755CDE",
          }}
        >
          <DialogTitle color="white">{title}</DialogTitle>
        </Box>

        <DialogContent>
          <Typography variant="subtitle1">
            <DescriptionRoundedIcon
              sx={{ fontSize: "18px", marginRight: 2, color: "#755CDE" }}
            />
            {description}
          </Typography>

          <Typography variant="subtitle1">
            <SportsScoreRoundedIcon
              sx={{ fontSize: "18px", marginRight: 2, color: "#755CDE" }}
            />
            {points} points
          </Typography>
          <input type="hidden" value={questTaskid} />
          <input type="hidden" value={points} />
          <input type="hidden" value={memberId} />
          <input type="hidden" value={dueAt} />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button autoFocus onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button tpye="submit" onClick={handleOk} variant="contained">
            Mark As Done
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default TaskDetails;
