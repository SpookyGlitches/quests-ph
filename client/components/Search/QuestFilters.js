import { ToggleButtonGroup, Box } from "@mui/material";
import StyledToggleButton from "../Common/StyledToggleButton";

export default function QuestFilters(props) {
  const { filterParams, rootStyles, setFilterParams } = props;

  const handleCategoryChange = (event, newCategories) => {
    event.preventDefault();
    if (newCategories.length === 0) return;
    setFilterParams((prev) => ({ ...prev, category: newCategories }));
  };

  const handleStatusChange = (event, newCompleted) => {
    event.preventDefault();
    if (newCompleted.length === 0) return;
    setFilterParams((prev) => ({ ...prev, status: newCompleted }));
  };

  return (
    <Box sx={rootStyles}>
      <ToggleButtonGroup
        selected={filterParams.category}
        value={filterParams.category}
        color="primary"
        onChange={handleCategoryChange}
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
      <ToggleButtonGroup
        color="primary"
        onChange={handleStatusChange}
        selected={filterParams.status}
        value={filterParams.status}
      >
        <StyledToggleButton size="small" value="ACTIVE">
          Active
        </StyledToggleButton>
        <StyledToggleButton size="small" value="COMPLETED">
          Completed
        </StyledToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
