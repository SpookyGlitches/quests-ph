import { styled } from "@mui/material/styles";
import { ToggleButtonGroup } from "@mui/material";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    padding: 0,
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      padding: 3,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
      padding: 3,
    },
  },
}));

export default StyledToggleButtonGroup;
