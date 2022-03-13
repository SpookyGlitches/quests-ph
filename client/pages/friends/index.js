import AppLayout from "../../components/Layouts/AppLayout";
import SearchBar from "../../components/Friends/search";
import ListHolder from "../../components/Friends/FriendListHolder";
import FilterHolder from "../../components/Friends/FilterHolder";

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
