import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";

export default function AdminDataGrid({ tableData, page, path }) {
  const router = useRouter();
  // eslint-disable-next-line
  const handleClick = (event, cellValues) => {
    console.log(event);
    console.log(cellValues);
  };

  // Users Mgmt

  /* Applications Mgmt */
  // Approve Application
  const handleApproveReport = async (event, cellValues) => {
    console.log(cellValues.row.userReportId);
    try {
      const res = await axios.put(
        `/api/admin/reports/${cellValues.row.userReportId}/approveReport`,
      );
      // Probs gonna add something like sending an email then requiring them to send again.
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Reject Application
  const handleRejectReport = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/reports/${cellValues.row.userReportId}/rejectReport`,
      );
      // Probs gonna add something like sending an email then requiring them to send again.
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Reject Application
  const handleRemoveBan = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/reports/${cellValues.row.userReportId}/removeBan`,
      );
      // Probs gonna add something like sending an email then requiring them to send again.
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  // Articles Mgmt

  // Quests Mgmt

  // Reports Mgmt

  let columns;
  let dataGrid;
  if (page === "reports") {
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
          field: "recipientFullName",
          headerName: "Reported User",
          width: 160,
          headerAlign: "center",
        },
        {
          field: "reporterFullName",
          headerName: "Reporter",
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
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mr: 2 }}
                  onClick={(event) => {
                    handleApproveReport(event, cellValues);
                  }}
                >
                  Approve
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={(event) => {
                    handleRejectReport(event, cellValues);
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
          field: "recipientFullName",
          headerName: "Reported User",
          width: 160,
          headerAlign: "center",
        },
        {
          field: "reporterFullName",
          headerName: "Reporter",
          width: 160,
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
                  handleRemoveBan(event, cellValues);
                }}
              >
                Remove Ban
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
          field: "recipientFullName",
          headerName: "Reported User",
          width: 160,
          headerAlign: "center",
        },
        {
          field: "reporterFullName",
          headerName: "Reporter",
          width: 160,
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
