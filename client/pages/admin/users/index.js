import { Typography, Box } from "@mui/material";
import SearchBar from "../../../components/Admin/Search";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import BasicTable from "../../../components/Admin/Table/DataTable";

export default function Index() {
  const usersData = [
    {
      id: 1,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 2,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 3,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 4,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 5,
      username: "grapejuice",
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
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Typography variant="body1">Total Parties: 5</Typography>
          <SearchBar />
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          <BasicTable
            tableData={usersData}
            headingColumns={[
              "ID",
              "Username",
              "Name",
              "Email",
              "Type",
              "Action",
            ]}
            page="users"
          />
        </Box>
      </Box>
    </AdminLayout>
  );
}
