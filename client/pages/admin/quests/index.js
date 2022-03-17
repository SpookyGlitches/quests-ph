import { Box } from "@mui/material";
import SearchBar from "../../../components/Admin/Search";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import DataTable from "../../../components/Admin/Table/DataTable";

export default function Index() {
  const applicationsData = [
    {
      id: 1,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Losing Weight",
    },
    {
      id: 2,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Make more friends",
    },
    {
      id: 3,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Become a good developer",
    },
    {
      id: 4,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Gaining weight",
    },
    {
      id: 5,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Lose more friends",
    },
  ];

  return (
    <AdminLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "row",
          }}
        >
          <SearchBar />
        </Box>
        <DataTable
          tableData={applicationsData}
          headingColumns={["ID", "Party Leader", "Status", "Wish", "Action"]}
          sx={{
            margin: "2rem",
          }}
          page="quests"
        />
      </Box>
    </AdminLayout>
  );
}
