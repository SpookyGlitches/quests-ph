import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function DataGridDemo({ tableData, page, path }) {
  // eslint-disable-next-line
  const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
  };
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
  } else if (page === "applications") {
    if (path === "new") {
      // eslint-disable-next-line
      columns = [
        {
          field: "mentorApplicationid",
          headerName: "Application ID",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "mentorId",
          headerName: "Applicant Name",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "Document",
          headerAlign: "center",
          width: 250,
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
          width: 250,
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
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.mentorApplicationid}
          // getRowId={getRowInput}
          // eslint-disable next-line
          columns={columns}
          pageSize={5}
        />
      );
    } else if (path === "approved") {
      // eslint-disable-next-line
      columns = [
        {
          field: "mentorApplicationid",
          headerName: "Application ID",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "mentorId",
          headerName: "Applicant Name",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "Document",
          headerAlign: "center",
          width: 250,
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
          width: 150,
          renderCell: (cellValues) => {
            return (
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
            );
          },
        },
      ];
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.mentorApplicationid}
          // getRowId={getRowInput}
          // eslint-disable next-line
          columns={columns}
          pageSize={5}
        />
      );
    } else {
      // eslint-disable-next-line
      columns = [
        {
          field: "mentorApplicationid",
          headerName: "Application ID",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "mentorId",
          headerName: "Applicant Name",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "Document",
          headerAlign: "center",
          width: 250,
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
          width: 150,
          renderCell: (cellValues) => {
            return (
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
            );
          },
        },
      ];
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.mentorApplicationid}
          // getRowId={getRowInput}
          // eslint-disable next-line
          columns={columns}
          pageSize={5}
        />
      );
    }
  } else if (page === "articles") {
    if (path === "new") {
      // eslint-disable-next-line
      columns = [
        {
          field: "articleId",
          headerName: "ID",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "userId",
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
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.articleId}
          // getRowId={getRowInput}
          // eslint-disable next-line
          columns={columns}
          pageSize={5}
        />
      );
    } else {
      // eslint-disable-next-line
      columns = [
        {
          field: "articleId",
          headerName: "ID",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "userId",
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
          getRowId={(row) => row.articleId}
          // getRowId={getRowInput}
          // eslint-disable next-line
          columns={columns}
          pageSize={5}
        />
      );
    }
  } else if (page === "quests") {
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
  } else if (page === "reports") {
    if (path === "new") {
      // eslint-disable-next-line
      columns = [
        {
          field: "userReportId",
          headerName: "ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "recipientId",
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
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.userReportId}
          // getRowId={getRowInput}
          // eslint-disable next-line
          columns={columns}
          pageSize={5}
        />
      );
    } else if (path === "ongoing") {
      // eslint-disable-next-line
      columns = [
        {
          field: "userReportId",
          headerName: "ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "recipientId",
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
          field: "banStart",
          headerName: "Start Date",
          width: 140,
          headerAlign: "center",
        },
        {
          field: "banEnd",
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
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.userReportId}
          // getRowId={getRowInput}
          // eslint-disable next-line
          columns={columns}
          pageSize={5}
        />
      );
    } else {
      // eslint-disable-next-line
      columns = [
        {
          field: "userReportId",
          headerName: "ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "recipientId",
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
          field: "banStart",
          headerName: "Start Date",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "banEnd",
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
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.userReportId}
          // getRowId={getRowInput}
          // eslint-disable next-line
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
