import AppLayout from "../../components/Layouts/AppLayout";
<<<<<<< HEAD
import SearchBar from "../../components/Friends/Search.js";
import ListHolder from "../../components/Friends/FriendListHolder.js";
import FilterHolder from "../../components/Friends/FilterHolder.js";
=======
import SearchBar from "../../components/Friends/search";
import ListHolder from "../../components/Friends/FriendListHolder";
import FilterHolder from "../../components/Friends/FilterHolder";
>>>>>>> main

const Index = () => {
  return (
    <AppLayout>
      <div>
        <SearchBar />

        <FilterHolder />

        <ListHolder requestName="Incoming Requests" />

        <ListHolder requestName="Outgoing Requests" />

        <ListHolder requestName="Friends" />
      </div>
    </AppLayout>
  );
};
export default Index;
