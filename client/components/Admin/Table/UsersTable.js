import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function AdminDataGrid({ tableData, page }) {
  // eslint-disable-next-line
  const handleClick = (event, cellValues) => {
    console.log(event);
    console.log(cellValues);
  };

  // Users Mgmt

  /* Applications Mgmt */

  // Articles Mgmt

  // Quests Mgmt

  // Reports Mgmt

  let columns;
  let dataGrid;
  if (page === "users") {
    // eslint-disable-next-line

    columns = [
      {
        field: "userId",
        headerName: "User ID",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "displayName",
        headerName: "Username",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "fullName",
        headerName: "Name",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        headerAlign: "center",
      },
      { field: "role", headerName: "Role", width: 150, headerAlign: "center" },
      {
        field: "Action",
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ];
    dataGrid = (
      <DataGrid
        sx={{ m: 2 }}
        rowHeight={120}
        rows={tableData}
        getRowId={(row) => row.userId}
        // getRowId={getRowInput}
        // eslint-disable next-line
        columns={columns}
        pageSize={5}
      />
    );
  }

  return (
    <div
      style={{
        height: 500,
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* <DataGrid
        sx={{ m: 2 }}
        rowHeight={120}
        rows={tableData}
        getRowId={(row) => row.userId}
        // getRowId={getRowInput}
        // eslint-disable next-line
        columns={columns}
        pageSize={5}
      /> */}
      {dataGrid}
    </div>
  );
}
