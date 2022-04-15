import { ToggleButtonGroup, Box } from "@mui/material";
import StyledToggleButton from "../Common/StyledToggleButton";

export default function ArticleFilters(props) {
  const { filterParams, rootStyles, setFilterParams } = props;

  const handleCategoryChange = (event, newCategory) => {
    event.preventDefault();
    if (!newCategory) return;
    setFilterParams(newCategory);
  };

  return (
    <Box sx={rootStyles}>
      <ToggleButtonGroup
        selected={filterParams}
        value={filterParams}
        color="primary"
        onChange={handleCategoryChange}
        exclusive
      >
        {["Health", "Social", "Career"].map((category) => {
          return (
            <StyledToggleButton
              key={category}
              size="small"
              value={category.toUpperCase()}
            >
              {category}
            </StyledToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
}
