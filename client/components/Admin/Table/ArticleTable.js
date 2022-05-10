import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminDataGrid({ tableData, page, path }) {
  const [open, setOpen] = React.useState(false);
  const [rowLink, setRowLink] = React.useState();
  const router = useRouter();

  const handleClick = (event, cellValues) => {
    setRowLink(cellValues.row.link);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
          headerName: "Article ID",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "displayName",
          headerName: "Display Name",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "category",
          headerName: "Category",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "View Link",
          headerAlign: "center",
          width: 100,
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
          width: 275,
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
          width: 100,
          headerAlign: "center",
        },
        {
          field: "displayName",
          headerName: "Display Name",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "category",
          headerName: "Category",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "approvedAt",
          headerName: "Approval Date",
          width: 125,
          headerAlign: "center",
        },
        {
          field: "View Link",
          headerAlign: "center",
          width: 100,
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
          width: 125,
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
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Article Link: </DialogTitle>
          <Stack spacing={1.5} sx={{ mt: "-1.5em" }}>
            <DialogContent>
              <Typography>{rowLink}</Typography>
            </DialogContent>
          </Stack>
        </Dialog>
      </div>
    );
  }
}
