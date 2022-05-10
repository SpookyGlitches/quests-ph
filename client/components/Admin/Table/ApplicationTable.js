import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, TextField, FormControl } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitArticle } from "../../../validations/SubmitArticle";

const openFile = async (key) => {
  const beforeDot = key.substr(0, key.indexOf("."));
  const afterDot = key.substr(key.indexOf(".") + 1);
  const signedURL = `/api/auth/getPresignedUrl?type=${encodeURIComponent(
    afterDot,
  )}&key=${beforeDot}&role=mentor`;
  const { data: awsURL } = await axios.get(signedURL);
  const newWindow = window.open(`${awsURL}`, "_blank", "noopener,noreferrer");
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
  const [openRejection, setOpenRejection] = React.useState(false);
  const [cellVals, setCellVals] = React.useState("");
  const router = useRouter();
  const [fileArr, setFileArr] = React.useState([]);
  const [expArr, setExpArr] = React.useState([]);
  const currentValidationSchema = SubmitArticle[1];
  const methods = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
    defaultValues: {
      rejectionReason: "",
    },
  });
  const { control, handleSubmit, reset, formState } = methods;
  const { errors } = formState;
  const handleClose = () => {
    setOpen(false);
  };
  // Reject Application
  // eslint-disable-next-line
  const handleRejectApplication = async (event, cellValues) => {
    setOpenRejection(true);
    setCellVals(cellValues.row.mentorId);
  };
  const onSubmitReject = async (values) => {
    try {
      await axios
        .put(`/api/admin/applications/${cellVals}/rejectApplication`, {
          values: values.rejectionReason,
        })
        .then(() => {
          setOpenRejection(false);
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    reset();
  };
  const handleCloseRejection = () => {
    setOpenRejection(false);
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

  let columns;
  let dataGrid;
  if (page === "applications") {
    if (path === "new") {
      // eslint-disable-next-line
      columns = [
        {
          field: "mentorApplicationid",
          headerName: "Application ID",
          width: 125,
          headerAlign: "center",
        },
        {
          field: "displayName",
          headerName: "Applicant Name",
          width: 175,
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
          width: 225,
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
          width: 125,
          headerAlign: "center",
        },

        {
          field: "fullName",
          headerName: "Applicant Full Name",
          width: 175,
          headerAlign: "center",
        },
        {
          field: "email",
          headerName: "Email",
          width: 250,
          headerAlign: "center",
        },
        {
          field: "Document",
          headerAlign: "center",
          width: 150,
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
            <Typography>
              GWA: {expArr[0]?.gwa ? expArr[0]?.gwa : "N/A"}
            </Typography>
            <Typography>
              Year Level: {expArr[0]?.yearLevel ? expArr[0]?.yearLevel : "N/A"}
            </Typography>
            <Typography>
              Course: {expArr[0]?.course ? expArr[0]?.course : "N/A"}
            </Typography>
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

      <Dialog open={openRejection} onClose={handleCloseRejection}>
        <DialogTitle>
          <Typography variant="h4" style={{ color: "#755cde" }}>
            Reject Application
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmitReject)}>
          <DialogContent sx={{ mt: -1 }}>
            <DialogContentText>
              <Typography>
                Input your reason for rejection here. You may put NA if
                applicable.
              </Typography>
            </DialogContentText>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <Controller
                control={control}
                name="rejectionReason"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    id="filled-basic"
                    label="Reason"
                    multiline
                    rows={2}
                    onChange={onChange}
                    value={value}
                    sx={{ mt: 2 }}
                    error={
                      errors.rejectionReason && errors.rejectionReason.message
                    }
                    helperText={
                      errors.rejectionReason
                        ? errors.rejectionReason.message
                        : ""
                    }
                  />
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseRejection}
              variant="outlined"
              color="primary"
              style={{
                backgroundColor: "#B0B0B0",
                borderColor: "#E8E8E8",
                color: "white",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {dataGrid}
    </div>
  );
}
