import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Typography,
  Stack,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";

export default function AdminDataGrid({ tableData, page, path }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [displayName, setDisplayName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [reportId, setReportId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const [banStart, setBanStart] = React.useState("");
  const [banEnd, setBanEnd] = React.useState("");
  const [screenshot, setScreenshot] = React.useState("");
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      duration: 1,
    },
  });
  const { control, handleSubmit } = methods;

  // eslint-disable-next-line
  const handleClick = async (event, cellValues) => {
    setOpen(true);
    setRecipient(cellValues.row.recipientId);
    setReportId(cellValues.row.userReportId);
    setDisplayName(cellValues.row.recipientDisplayName);
    setCategory(cellValues.row.category);
    setBanStart(cellValues.row.banStart);
    setBanEnd(cellValues.row.banEnd);
    setDescription(cellValues.row.description);
    if (cellValues.row.screenshot) {
      const signedURL = `/api/auth/getPresignedUrl?key=${cellValues.row.screenshot}&role=mentee`;
      const { data: awsURL } = await axios.get(signedURL);
      setScreenshot(awsURL);
    } else {
      setScreenshot("");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (values) => {
    try {
      await axios
        .put(`/api/admin/reports/${reportId}/approveReport`, {
          duration: values,
          recipient,
        })
        .then(() => {
          setOpen(false);
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Reject Report
  const handleRejectReport = async (event, cellValues) => {
    try {
      const res = await axios.put(
        `/api/admin/reports/${cellValues.row.userReportId}/rejectReport`,
      );
      router.reload();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Ban
  const handleRemoveBan = async (event, cellValues) => {
    try {
      await axios
        .put(`/api/admin/reports/${cellValues.row.userReportId}/removeBan`, {
          userId: cellValues.row.recipientId,
        })
        .then(() => {
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
          field: "recipientDisplayName",
          headerName: "Reported User",
          width: 125,
          headerAlign: "center",
        },
        {
          field: "reporterDisplayName",
          headerName: "Reporter",
          width: 125,
          headerAlign: "center",
        },
        {
          field: "status",
          headerName: "Status",
          width: 125,
          headerAlign: "center",
        },
        {
          field: "Report",
          headerAlign: "center",
          width: 125,
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
          width: 120,
          renderCell: (cellValues) => {
            return (
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
          field: "recipientDisplayName",
          headerName: "Reported User",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "reporterDisplayName",
          headerName: "Reporter",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "banStart",
          headerName: "Start Date",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "banEnd",
          headerName: "End Date",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "Report",
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
          field: "recipientDisplayName",
          headerName: "Reported User",
          width: 120,
          headerAlign: "center",
        },
        {
          field: "reporterDisplayName",
          headerName: "Reporter",
          width: 120,
          headerAlign: "center",
        },
        {
          field: "banStart",
          headerName: "Start Date",
          width: 125,
          headerAlign: "center",
        },
        {
          field: "banEnd",
          headerName: "End Date",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "Report",
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
      ];
      dataGrid = (
        <DataGrid
          sx={{ m: 2 }}
          rowHeight={120}
          rows={tableData}
          getRowId={(row) => row.userReportId}
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
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Report Details</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1.5} sx={{ mt: "-1.5em" }}>
            <DialogContent>
              <Typography>Display Name: {displayName}</Typography>
              <Typography>Category: {category}</Typography>
              <Typography>Description: {description}</Typography>
              {banStart ? (
                <Typography>Ban Start Date: {banStart}</Typography>
              ) : (
                ""
              )}
              {banEnd ? <Typography>Ban End Date: {banEnd}</Typography> : ""}
              <Typography>Evidence: </Typography>
              {screenshot ? (
                <Image
                  src={`${screenshot}`}
                  alt="report"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              ) : (
                <Typography>N/A</Typography>
              )}
              {path === "ongoing" || path === "completed" ? null : (
                <FormControl fullWidth variant="outlined">
                  <Controller
                    control={control}
                    name="duration"
                    render={({ field: { onChange, value } }) => (
                      <FormControl variant="filled" sx={{ mt: 2 }}>
                        <InputLabel>Ban Duration</InputLabel>

                        <Select onChange={onChange} value={value}>
                          <MenuItem value={1}>1 day</MenuItem>
                          <MenuItem value={3}>3 days</MenuItem>
                          <MenuItem value={7}>7 days</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </FormControl>
              )}
            </DialogContent>
          </Stack>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {path === "ongoing" || path === "completed" ? null : (
              <Button type="submit">Approve Report</Button>
            )}
          </DialogActions>
        </form>
      </Dialog>

      {dataGrid}
    </div>
  );
}
