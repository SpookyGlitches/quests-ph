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
  /* Users Mgmt */

  const [open, setOpen] = React.useState(false);
  const [openedUser, setOpenedUser] = React.useState();
  const handleClickOpen = (event, cellValues) => {
    setOpen(true);
    setOpenedUser(cellValues);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenedUser();
  };

  const handleDeleteUser = async () => {
    console.log(openedUser);
    try {
      const { userId } = openedUser.row;
      const res = await axios.put(`/api/admin/users/${userId}/deleteUser`);
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Applications Mgmt

  // Articles Mgmt

  // Quests Mgmt

  // Reports Mgmt

  let columns;
  let dataGrid;
  if (page === "users") {
    if (path === "all") {
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
        {
          field: "role",
          headerName: "Role",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "Action",
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
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
          getRowId={(row) => row.userId}
          columns={columns}
          pageSize={5}
        />
      );
    } else {
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
        {
          field: "role",
          headerName: "Role",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "deletedAt",
          headerName: "Date Deleted",
          width: 150,
          headerAlign: "center",
        },
      ];
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.userId}
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
        <DialogTitle>Delete Friend</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this user? This action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteUser}>Okay</Button>
        </DialogActions>
      </Dialog>
      ;
    </div>
  );
}
