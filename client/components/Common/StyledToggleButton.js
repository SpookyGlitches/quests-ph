import { styled } from "@mui/material/styles";
import { ToggleButton } from "@mui/material";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  fontWeight: "normal",
  "&.Mui-selected": {
    fontWeight: 500,
  },
}));

export default StyledToggleButton;
