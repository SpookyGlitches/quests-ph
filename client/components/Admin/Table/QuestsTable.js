import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminDataGrid({ tableData, page, path }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openedQuest, setOpenedQuest] = React.useState();
  const handleClickOpen = (event, cellValues) => {
    setOpen(true);
    setOpenedQuest(cellValues);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedQuest();
  };

  // Users Mgmt

  // Applications Mgmt

  // Articles Mgmt

  /* Quests Mgmt */
  const handleDeleteQuest = async () => {
    try {
      const { questId } = openedQuest.row;
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
                  handleClickOpen(event, cellValues);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete Quest</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this quest? This action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteQuest}>Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
