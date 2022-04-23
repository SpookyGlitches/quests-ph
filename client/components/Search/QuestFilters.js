import { ToggleButtonGroup, Box } from "@mui/material";
import { add, format } from "date-fns";
import { useRouter } from "next/router";
import StyledToggleButton from "../Common/StyledToggleButton";

export default function QuestFilters(props) {
  const { filterParams, rootStyles, setFilterParams } = props;
  const router = useRouter();
  const handleCategoryChange = (event, newCategories) => {
    event.preventDefault();
    if (newCategories.length === 0) return;
    setFilterParams((prev) => ({ ...prev, category: newCategories }));
  };

  const handleStatusChange = (event, newCompleted) => {
    event.preventDefault();
    const newVal = { status: newCompleted };
    if (newCompleted.length === 0) return;
    if (filterParams.startsAt) {
      newVal.startsAt = "";
    }
    setFilterParams((prev) => ({ ...prev, ...newVal }));
  };

  const handleStartsAtChange = (event, newStartsAt) => {
    event.preventDefault();
    const newVal = { startsAt: newStartsAt };
    if (filterParams.status.includes("COMPLETED")) {
      newVal.status = ["ACTIVE"];
    }
    if (!newStartsAt) {
      newVal.startsAt = "";
    }
    setFilterParams((prev) => ({ ...prev, ...newVal }));
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
      {router.pathname.startsWith("/search") && (
        <ToggleButtonGroup
          color="primary"
          onChange={handleStartsAtChange}
          selected={filterParams.startsAt}
          value={filterParams.startsAt}
          exclusive
        >
          <StyledToggleButton
            size="small"
            value={format(add(new Date(), { days: 7 }), "yyyy-MM-dd")}
          >
            Starts in 7d
          </StyledToggleButton>
          <StyledToggleButton
            size="small"
            value={format(add(new Date(), { days: 14 }), "yyyy-MM-dd")}
          >
            Starts in 14d
          </StyledToggleButton>
        </ToggleButtonGroup>
      )}
    </Box>
  );
}
