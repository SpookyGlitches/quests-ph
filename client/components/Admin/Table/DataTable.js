import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function DataGridDemo({ tableData, page, path }) {
  // eslint-disable-next-line
  const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
  };
  let columns;
  if (page === "users") {
    // eslint-disable-next-line
    columns = [
      {
        field: "id",
        headerName: "ID",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "username",
        headerName: "Username",
        width: 150,
        headerAlign: "center",
      },
      { field: "name", headerName: "Name", width: 150, headerAlign: "center" },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        headerAlign: "center",
      },
      { field: "type", headerName: "Type", width: 150, headerAlign: "center" },
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
  } else if (page === "applications") {
    if (path === "new") {
      // eslint-disable-next-line
      columns = [
        {
          field: "id",
          headerName: "ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "name",
          headerName: "Name",
          width: 120,
          headerAlign: "center",
        },
        {
          field: "email",
          headerName: "Email",
          width: 180,
          headerAlign: "center",
        },
        {
          field: "status",
          headerName: "Status",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "Document",
          headerAlign: "center",
          width: 200,
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "0 auto", display: "flex" }}
                onClick={(event) => {
                  handleClick(event, cellValues);
                }}
              >
                View
              </Button>
            );
          },
        },
        {
          field: "Action",
          headerAlign: "center",
          width: 200,
          renderCell: (cellValues) => {
            return (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mr: 2 }}
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }}
                >
                  Approve
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }}
                >
                  Reject
                </Button>
              </>
            );
          },
        },
      ];
    } else {
      // eslint-disable-next-line
      columns = [
        {
          field: "id",
          headerName: "ID",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "name",
          headerName: "Name",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "email",
          headerName: "Email",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "status",
          headerName: "Status",
          width: 200,
          headerAlign: "center",
        },
      ];
    }
  } else if (page === "articles") {
    if (path === "new") {
      // eslint-disable-next-line
      columns = [
        {
          field: "id",
          headerName: "ID",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "username",
          headerName: "Username",
          width: 160,
          headerAlign: "center",
        },
        {
          field: "category",
          headerName: "Category",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "link",
          headerName: "Link",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "Action",
          headerAlign: "center",
          width: 200,
          renderCell: (cellValues) => {
            return (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mr: 2 }}
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }}
                >
                  Approve
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }}
                >
                  Reject
                </Button>
              </>
            );
          },
        },
      ];
    } else {
      // eslint-disable-next-line
      columns = [
        {
          field: "id",
          headerName: "ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "username",
          headerName: "Username",
          width: 160,
          headerAlign: "center",
        },
        {
          field: "category",
          headerName: "Category",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "link",
          headerName: "Link",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "status",
          headerName: "Status",
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
    }
  } else if (page === "quests") {
    // eslint-disable-next-line
    columns = [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        headerAlign: "center",
      },
      {
        field: "party_leader",
        headerName: "Party Leader",
        width: 160,
        headerAlign: "center",
      },
      {
        field: "status",
        headerName: "Status",
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
  } else if (path === "new") {
    // eslint-disable-next-line
    columns = [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        headerAlign: "center",
      },
      {
        field: "username",
        headerName: "Username",
        width: 160,
        headerAlign: "center",
      },
      {
        field: "status",
        headerName: "Status",
        width: 160,
        headerAlign: "center",
      },
      {
        field: "Report",
        headerAlign: "center",
        width: 200,
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0 auto", display: "flex" }}
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              View
            </Button>
          );
        },
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
              Action
            </Button>
          );
        },
      },
    ];
  } else if (path === "ongoing") {
    // eslint-disable-next-line
    columns = [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        headerAlign: "center",
      },
      {
        field: "username",
        headerName: "Username",
        width: 140,
        headerAlign: "center",
      },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        headerAlign: "center",
      },
      {
        field: "StartDate",
        headerName: "Start Date",
        width: 140,
        headerAlign: "center",
      },
      {
        field: "EndDate",
        headerName: "End Date",
        width: 140,
        headerAlign: "center",
      },
      {
        field: "Report",
        headerAlign: "center",
        width: 160,
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0 auto", display: "flex" }}
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              View
            </Button>
          );
        },
      },
      {
        field: "Action",
        headerAlign: "center",
        width: 160,
        renderCell: (cellValues) => {
          return (
            <Button
              variant="contained"
              color="success"
              style={{ margin: "0 auto", display: "flex" }}
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Enable
            </Button>
          );
        },
      },
    ];
  } else {
    // eslint-disable-next-line
    columns = [
      {
        field: "id",
        headerName: "ID",
        width: 100,
        headerAlign: "center",
      },
      {
        field: "username",
        headerName: "Username",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "StartDate",
        headerName: "Start Date",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "EndDate",
        headerName: "End Date",
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
  }

  return (
    <div
      style={{
        height: 500,
        width: "100%",
        textAlign: "center",
      }}
    >
      <DataGrid
        sx={{ m: 2 }}
        rowHeight={120}
        rows={tableData}
        // eslint-disable next-line
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
