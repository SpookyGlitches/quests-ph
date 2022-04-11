import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";

export default function AdminDataGrid({ tableData, page, path }) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  // eslint-disable-next-line
  const handleClick = (event, cellValues) => {
    console.log(event);
    console.log(cellValues);
  };

  /* Applications Mgmt */
  // Approve Application
  const handleApproveApplication = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/applications/${cellValues.row.mentorId}/approveApplication`,
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Reject Application
  const handleRejectApplication = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/applications/${cellValues.row.mentorId}/rejectApplication`,
      );
      // Probs gonna add something like sending an email then requiring them to send again.
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log("updated");
  };
  // Articles Mgmt

  // Quests Mgmt

  // Reports Mgmt

  let columns;
  let dataGrid;
  if (page === "applications") {
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
          field: "fullName",
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
                    handleApproveApplication(event, cellValues);
                  }}
                >
                  Approve
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={(event) => {
                    handleRejectApplication(event, cellValues);
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
          field: "fullName",
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
                  handleRejectApplication(event, cellValues);
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
