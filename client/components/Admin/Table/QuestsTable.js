import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminDataGrid({ tableData, page, path }) {
  const router = useRouter();

  // Users Mgmt

  // Applications Mgmt

  // Articles Mgmt

  /* Quests Mgmt */
  const handleDeleteQuest = async (event, cellValues) => {
    try {
      const { questId } = cellValues.row;
      const res = await axios.put(`/api/admin/quests/${questId}/deleteQuest`);
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Reports Mgmt

  let columns;
  let dataGrid;
  if (page === "quests") {
    if (path === "new") {
      // eslint-disable-next-line
      columns = [
        {
          field: "questId",
          headerName: "Quest ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "displayName",
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
                  handleDeleteQuest(event, cellValues);
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
          columns={columns}
          pageSize={5}
        />
      );
    } else {
      // eslint-disable-next-line
      columns = [
        {
          field: "questId",
          headerName: "Quest ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "displayName",
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
          field: "completedAt",
          headerName: "Completed At",
          width: 150,
          headerAlign: "center",
        },
      ];
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.questId}
          columns={columns}
          pageSize={5}
        />
      );
    }
  }

  return (
    <div
      style={{
        height: 500,
        width: "100%",
        textAlign: "center",
      }}
    >
      {dataGrid}
    </div>
  );
}
