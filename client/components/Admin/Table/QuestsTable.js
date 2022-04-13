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
  if (page === "quests") {
    // eslint-disable-next-line
    columns = [
      {
        field: "questId",
        headerName: "Quest ID",
        width: 100,
        headerAlign: "center",
      },
      {
        field: "userId",
        headerName: "Party Leader",
        width: 160,
        headerAlign: "center",
      },
      {
        field: "difficulty",
        headerName: "Difficulty",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "visibility",
        headerName: "Visibility",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "category",
        headerName: "Category",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "wish",
        headerName: "Wish",
        width: 150,
        headerAlign: "center",
      },

      {
        field: "Action",
        headerAlign: "center",
        width: 200,
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="error"
              style={{ margin: "0 auto", display: "flex" }}
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
        getRowId={(row) => row.questId}
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
