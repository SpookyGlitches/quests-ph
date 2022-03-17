import { Box } from "@mui/material";
import SearchBar from "../../../components/Admin/Search";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import DataTable from "../../../components/Admin/Table/DataTable";

export default function Index() {
  const applicationsData = [
    {
      id: 1,
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 2,
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 3,
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 4,
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 5,
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
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
          headingColumns={[
            "ID",
            "Name",
            "Email",
            "Status",
            "Document",
            "Action",
          ]}
          sx={{
            margin: "2rem",
          }}
          page="applications"
          path="new"
        />
      </Box>
    </AdminLayout>
  );
}
