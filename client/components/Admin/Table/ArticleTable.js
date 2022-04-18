import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminDataGrid({ tableData, page, path }) {
  const router = useRouter();

  const handleApproveArticle = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/articles/${cellValues.row.articleId}/approveArticle`,
      );
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log("updated");
  };

  // Reject Article
  const handleRejectArticle = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/articles/${cellValues.row.articleId}/rejectArticle`,
      );
      // Probs gonna add something like sending an email then requiring them to send again.
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/articles/${cellValues.row.articleId}/deleteArticle`,
      );
      // Probs gonna add something like sending an email then requiring them to send again.
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Quests Mgmt

  // Reports Mgmt

  let columns;
  let dataGrid;
  if (page === "articles") {
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
          field: "fullName",
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
                    handleApproveArticle(event, cellValues);
                  }}
                >
                  Approve
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={(event) => {
                    handleRejectArticle(event, cellValues);
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
          field: "fullName",
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
                  handleDeleteArticle(event, cellValues);
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
        {dataGrid}
      </div>
    );
  }
}
