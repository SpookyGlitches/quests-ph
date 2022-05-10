import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

export default function AdminDataGrid({ tableData, page, path }) {
  const router = useRouter();
  /* Users Mgmt */

  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [openedUser, setOpenedUser] = React.useState("");

  // User Fields
  const [userId, setUserId] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [deletedAt, setDeletedAt] = React.useState("");

  const handleOpen = (event, cellValues) => {
    setOpenDetails(true);
    setUserId(cellValues.row.userId);
    setDisplayName(cellValues.row.displayName);
    setFullName(cellValues.row.fullName);
    setEmail(cellValues.row.email);
    setRole(cellValues.row.role);
    setDeletedAt(cellValues.row.deletedAt);
    console.log(deletedAt);
  };

  const handleClickOpen = (event, cellValues) => {
    setOpen(true);
    setOpenedUser(cellValues);
  };
  const handleClose = () => {
    setOpenDetails(false);
    setOpen(false);
    setOpenedUser();
  };

  const handleDeleteUser = async () => {
    try {
      // eslint-disable-next-line
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
  let deletedAtField;
  if (page === "users") {
    if (path === "all") {
      // eslint-disable-next-line
      deletedAtField = "";
      columns = [
        {
          field: "userId",
          headerName: "User ID",
          width: 207,
          headerAlign: "center",
        },
        {
          field: "displayName",
          headerName: "Username",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "email",
          headerName: "Email",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "Details",
          headerAlign: "center",
          width: 100,
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "0 auto", display: "flex" }}
                onClick={(event) => {
                  handleOpen(event, cellValues);
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
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="error"
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
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.userId}
          columns={columns}
          pageSize={5}
        />
      );
    } else {
      // eslint-disable-next-line
      deletedAtField = (
        <Typography sx={{ mt: "1.5em" }}>Deleted On: {deletedAt}</Typography>
      );
      columns = [
        {
          field: "userId",
          headerName: "User ID",
          width: 207,
          headerAlign: "center",
        },
        {
          field: "displayName",
          headerName: "Username",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "email",
          headerName: "Email",
          width: 200,
          headerAlign: "center",
        },
        {
          field: "Details",
          headerAlign: "center",
          width: 100,
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "0 auto", display: "flex" }}
                onClick={(event) => {
                  handleOpen(event, cellValues);
                }}
              >
                View
              </Button>
            );
          },
        },
        {
          field: "deletedAt",
          headerName: "Delete Date",
          width: 110,
          headerAlign: "center",
        },
      ];
      dataGrid = (
        <DataGrid
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
      }}
    >
      {dataGrid}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete User</DialogTitle>
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

      <Dialog open={openDetails} fullWidth>
        <DialogTitle>User Details </DialogTitle>
        <Stack spacing={1.5} sx={{ mt: "-1.5em" }}>
          <DialogContent>
            <Typography sx={{ mt: "1.5em" }}>User ID: {userId}</Typography>
            <Typography sx={{ mt: "1.5em" }}>
              User Display Name: {displayName}
            </Typography>
            <Typography sx={{ mt: "1.5em" }}>
              User Full Name: {fullName}
            </Typography>
            <Typography sx={{ mt: "1.5em" }}>User Role: {role}</Typography>
            <Typography sx={{ mt: "1.5em" }}>User Email: {email}</Typography>
            {deletedAtField}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
}
