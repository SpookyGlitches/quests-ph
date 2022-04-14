import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { styled } from "@mui/material/styles";
import AppLayout from "../../components/Layouts/AppLayout";
import QuestsList from "../../components/Quest/QuestsList";
import PostsList from "../../components/Quest/Post/PostsList";
import Articles from "../../components/Articles/Articles";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  "&.Mui-selected .MuiTypography-body2": {
    fontWeight: "bold",
  },
}));

export default function Search() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [searchText] = useDebounce(text, 100);
  const [selectedItem, setSelectedItem] = useState("QUESTS");
  const [articlesCategory, setArticlesCategory] = useState("HEALTH");

  useEffect(() => {
    if (router.query.selected) setSelectedItem(router.query.selected);
  }, [router]);

  const renderResults = () => {
    switch (selectedItem) {
      case "QUESTS":
        return <QuestsList url="/quests" take={2} search={searchText} />;
      case "POSTS":
        return <PostsList url="/home" take={2} search={searchText} />;
      case "ARTICLES":
        return <Articles category={articlesCategory} search={searchText} />;
      default:
        return null;
    }
  };

  const handleItemClick = (event, newItem) => {
    event.preventDefault();
    if (newItem) setSelectedItem(newItem);
  };

  const handleSearchChange = (event) => {
    setText(event.target.value);
  };

  const handleCategoryClick = (event, newCategory) => {
    event.preventDefault();
    if (newCategory) setArticlesCategory(newCategory);
  };

  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={text}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 1,
          }}
          InputProps={{
            startAdornment: (
              <IconButton size="small">
                <SearchRoundedIcon />
              </IconButton>
            ),
          }}
        />
        <ToggleButtonGroup
          value={selectedItem}
          onChange={handleItemClick}
          fullWidth
          exclusive
          color="primary"
          sx={{
            flexWrap: {
              xs: "wrap",
              sm: "nowrap",
            },
          }}
        >
          {["Quests", "Posts", "Articles", "Mentees", "Mentors"].map((item) => (
            <StyledToggleButton
              key={item}
              value={item.toUpperCase()}
              size="small"
              fullWidth
            >
              <Typography variant="body2">{item}</Typography>
            </StyledToggleButton>
          ))}
        </ToggleButtonGroup>
        {selectedItem === "ARTICLES" && (
          <ToggleButtonGroup
            exclusive
            value={articlesCategory}
            selected={articlesCategory}
            color="primary"
            onChange={handleCategoryClick}
            sx={{
              flexWrap: {
                xs: "wrap",
                sm: "nowrap",
              },
            }}
          >
            {["Career", "Health", "Social"].map((category) => {
              return (
                <StyledToggleButton
                  value={category.toUpperCase()}
                  key={category}
                  size="small"
                >
                  <Typography variant="body2">{category}</Typography>
                </StyledToggleButton>
              );
            })}
          </ToggleButtonGroup>
        )}

        <Box sx={{ pt: 3 }}>{renderResults()}</Box>
      </Stack>
    </Container>
  );
}

Search.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
