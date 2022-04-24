import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const openFile = (key) => {
  const newWindow = window.open(
    `${process.env.NEXT_PUBLIC_MENTORFILES_BASE_LINK}${key}`,
    "_blank",
    "noopener,noreferrer",
  );
  if (newWindow) newWindow.opener = null;
};

const ListItem = ({ array }) => {
  const List = array;
  const listItems = List.map((file) => (
    <li key={file.mentorApplicationId}>
      <Button onClick={() => openFile(file.key)}>{file.path}</Button>
    </li>
  ));
  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
};

export default function AdminDataGrid({ tableData, page, path }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [fileArr, setFileArr] = React.useState([]);
  const [expArr, setExpArr] = React.useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line
  const handleClick = async (event, cellValues) => {
    try {
      await axios({
        method: "get",
        url: `/api/admin/applications/${cellValues.row.mentorId}/getFiles`,
      })
        .then((res) => {
          setExpArr(res.data.experience);
          setFileArr(res.data.files);
          setOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line
  const handleClickApproved = async (event, cellValues) => {
    console.log(cellValues.row.mentorId);
    try {
      await axios({
        method: "get",
        url: `/api/admin/applications/${cellValues.row.mentorId}/getApprovedFiles`,
      })
        .then((res) => {
          setExpArr(res.data.experience);
          setFileArr(res.data.files);
          setOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Approve Application
  const handleApproveApplication = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/applications/${cellValues.row.mentorId}/approveApplication`,
      );
      router.reload();
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
      router.reload();
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
          field: "displayName",
          headerName: "Applicant Display Name",
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
          field: "displayName",
          headerName: "Applicant Display Name",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "fullName",
          headerName: "Applicant Full Name",
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
                  handleClickApproved(event, cellValues);
                }}
              >
                View
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Application Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>Experience: {expArr[0]?.experience}</Typography>
            <Typography>
              Detailed Experience: {expArr[0]?.detailedExperience}
            </Typography>
            <Typography>Supporting Documents:</Typography>
            <ListItem array={fileArr} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {dataGrid}
    </div>
  );
}
