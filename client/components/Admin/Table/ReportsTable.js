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

export default function AdminDataGrid({ tableData, page, path }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [displayName, setDisplayName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [reportId, setReportId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      duration: 1,
    },
  });
  const { control, handleSubmit } = methods;

  // eslint-disable-next-line
  const handleClick = (event, cellValues) => {
    setOpen(true);
    setRecipient(cellValues.row.recipientId);
    setReportId(cellValues.row.userReportId);
    setDisplayName(cellValues.row.recipientDisplayName);
    setCategory(cellValues.row.category);
    setDescription(cellValues.row.description);
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
          width: 160,
          headerAlign: "center",
        },
        {
          field: "reporterDisplayName",
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
          width: 160,
          headerAlign: "center",
        },
        {
          field: "reporterDisplayName",
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
          width: 160,
          headerAlign: "center",
        },
        {
          field: "reporterDisplayName",
          headerName: "Reporter",
          width: 160,
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
              {path === "ongoing" ? null : (
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
            {path === "ongoing" ? null : (
              <Button type="submit">Approve Report</Button>
            )}
          </DialogActions>
        </form>
      </Dialog>

      {dataGrid}
    </div>
  );
}
