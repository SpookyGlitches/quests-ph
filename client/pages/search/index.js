import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AppLayout from "../../components/Layouts/AppLayout";
import QuestsList from "../../components/Quest/QuestsList";

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
    <Container maxWidth="md">
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
          size="small"
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
      <ToggleButtonGroup
        color="primary"
        value={selectedItem}
        onChange={handleItemClick}
        exclusive
        fullWidth
        sx={{ mt: 2 }}
      >
        {["Articles", "Quests", "Users", "Posts", "Mentors"].map((item) => (
          <ToggleButton
            key={item}
            value={item.toLowerCase()}
            sx={{
              backgroundColor: "background.paper",
              "&.Mui-selected .MuiTypography-body2": {
                fontWeight: "medium",
              },
            }}
            size="small"
            fullWidth
          >
            <Typography variant="body2">{item}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

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
    </Container>
  );
}

Search.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
