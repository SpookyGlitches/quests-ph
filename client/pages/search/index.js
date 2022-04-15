import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  IconButton,
  Stack,
  TextField,
  ToggleButtonGroup,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AppLayout from "../../components/Layouts/AppLayout";
import QuestsList from "../../components/Quest/QuestsList";
import PostsList from "../../components/Quest/Post/PostsList";
import Articles from "../../components/Articles/Articles";
import UsersList from "../../components/Search/UsersList";
import StyledToggleButton from "../../components/Common/StyledToggleButton";
import QuestFilters from "../../components/Search/QuestFilters";
import ArticleFilters from "../../components/Search/ArticleFilters";

const questsFilterDefaultValues = {
  category: ["HEALTH", "SOCIAL", "CAREER"],
  status: ["ACTIVE", "COMPLETED"],
};
const articlesFilterDefaultValues = "HEALTH";

export default function Search() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [searchText] = useDebounce(text, 2000);
  const [selectedItem, setSelectedItem] = useState("QUESTS");
  const [filterParams, setFilterParams] = useState(questsFilterDefaultValues);

  useEffect(() => {
    if (router.query.selected) setSelectedItem(router.query.selected);
  }, [router]);

  const renderResults = () => {
    switch (selectedItem) {
      case "QUESTS":
        return (
          <QuestsList
            url="/quests"
            searchParams={{
              take: 5,
              search: searchText,
              searching: true,
              ...filterParams,
            }}
          />
        );
      case "POSTS":
        return (
          <PostsList
            url="/home"
            searchParams={{ take: 5, search: searchText }}
          />
        );
      case "ARTICLES":
        return <Articles category={filterParams} search={searchText} />;
      case "MENTEES":
        return (
          <UsersList
            url="/users"
            searchParams={{ take: 5, search: searchText, role: "member" }}
          />
        );
      case "MENTORS":
        return (
          <UsersList
            url="/users"
            searchParams={{ take: 5, search: searchText, role: "mentor" }}
          />
        );
      default:
        return null;
    }
  };

  const resetDefaultValues = (newItem) => {
    switch (newItem) {
      case "ARTICLES":
        setFilterParams(articlesFilterDefaultValues);
        break;
      case "QUESTS":
        setFilterParams(questsFilterDefaultValues);
        break;

      default:
        setFilterParams({});
    }
  };
  const handleItemClick = (event, newItem) => {
    event.preventDefault();
    if (!newItem) return;
    resetDefaultValues(newItem);
    setSelectedItem(newItem);
  };

  const handleSearchChange = (event) => {
    setText(event.target.value);
  };

  const renderFilters = () => {
    switch (selectedItem) {
      case "ARTICLES":
        return (
          <ArticleFilters
            filterParams={filterParams}
            setFilterParams={setFilterParams}
          />
        );
      case "QUESTS":
        return (
          <QuestFilters
            rootStyles={{ display: "flex", gap: 2, flexWrap: "wrap" }}
            filterParams={filterParams}
            setFilterParams={setFilterParams}
          />
        );
      default:
        return null;
    }
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
              {item}
            </StyledToggleButton>
          ))}
        </ToggleButtonGroup>

        {renderFilters()}

        <Box sx={{ pt: 3 }}>{renderResults()}</Box>
      </Stack>
    </Container>
  );
}

Search.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
