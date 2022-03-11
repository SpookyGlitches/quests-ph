import AppLayout from "../../components/Layouts/AppLayout";
import SearchBar from "../../components/Friends/search";
import ListHolder from "../../components/Friends/FriendListHolder";

const Index = () => {
  return (
    <AppLayout>
      <div>
        <SearchBar />
        <ListHolder
          requestName="Incoming Requests"
          fullname="Pretty Boy"
          username="prettyboy912"
        />

        <ListHolder
          requestName="Outgoing Requests"
          fullname="Boy Pretty"
          username="ngekngokprettyboy912"
        />

        <ListHolder
          requestName="Friends"
          fullname="Pretty Boy"
          username="Prettyngekngok231"
        />
      </div>
    </AppLayout>
  );
};
export default Index;
