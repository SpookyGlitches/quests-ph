import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 0.25,
  border: `1px solid ${theme.palette.grey[300]}`,
}));

export default StyledPaper;
