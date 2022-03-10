import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppLayout from "../../components/Layouts/AppLayout";
import {
  Box,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { styled } from "@mui/material/styles";
import QuestsList from "../../components/Quest/QuestsList";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,

    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  fontWeight: "medium",
  minWidth: 80,
  "&.Mui-selected": {
    fontWeight: "bold",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Search() {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState("quests");

  useEffect(() => {
    if (router.query.item) setSelectedItem(router.query.item);
  }, [router]);

  const handleItemClick = (event, newItem) => {
    setSelectedItem(newItem);
  };

  const renderResults = () => {
    switch (selectedItem) {
      case "quests":
        return <QuestsList hasJoined={false} />;
      default:
        return <div>😀</div>;
    }
  };

  return (
    <AppLayout>
      <Box sx={{ marginY: "1rem", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "background.paper",
            borderRadius: 1,
          }}
        >
          <TextField
            label="Search"
            variant="outlined"
            sx={{ flexGrow: 1, display: "flex" }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchRoundedIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <StyledToggleButtonGroup
          color="primary"
          value={selectedItem}
          onChange={handleItemClick}
          exclusive
          sx={{ marginY: "1rem", gap: 2, flexWrap: "wrap" }}
        >
          {["Articles", "Quests", "Users", "Posts", "Mentors"].map((item) => (
            <StyledToggleButton
              key={item}
              value={item.toLowerCase()}
              size="small"
            >
              {item}
            </StyledToggleButton>
          ))}
        </StyledToggleButtonGroup>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "90%",
              },
              flexDirection: "column",
              alignItems: "center",
              display: "flex",
              gap: 2,
            }}
          >
            {renderResults()}
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}
