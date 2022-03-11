import AppLayout from "../../components/Layouts/AppLayout";
import SearchBar from "../../components/Friends/searchyy.js";
import ListHolder from "../../components/Friends/FriendListHolder.js";
import FilterHolder from "../../components/Friends/FilterHolder.js";

const Index = () => {
  return (
    <AppLayout>
      <div>
        <SearchBar />

        <FilterHolder />

        <ListHolder requestName="Incoming Requests" displayName="imincoming" />

        <ListHolder requestName="Outgoing Requests" displayName="imoutgoing" />

        <ListHolder requestName="Friends" displayName="imafriend" />
      </div>
    </AppLayout>
  );
};
export default Index;
