import AppLayout from "../../components/Layouts/AppLayout";
import SearchBar from "../../components/Friends/Search.js";
import ListHolder from "../../components/Friends/FriendListHolder.js";

const Index = () => {
  return (
    <AppLayout>
      <div>
        <SearchBar />
        <ListHolder requestName="Incoming Requests" />

        <ListHolder requestName="Outgoing Requests" />

        <ListHolder requestName="Friends" />
      </div>
    </AppLayout>
  );
};
export default Index;
