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
  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [openedQuest, setOpenedQuest] = React.useState();

  // Quest Fields
  const [questId, setQuestId] = React.useState("");
  const [partyLeader, setPartyLeader] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const [visibility, setVisibility] = React.useState("");
  const [wish, setWish] = React.useState("");
  const [completedAt, setCompletedAt] = React.useState("");

  const handleOpen = (event, cellValues) => {
    setOpenDetails(true);
    setQuestId(cellValues.row.questId);
    setPartyLeader(cellValues.row.displayName);
    setDifficulty(cellValues.row.difficulty);
    setVisibility(cellValues.row.visibility);
    setWish(cellValues.row.wish);
    setCompletedAt(cellValues.row.completedAt);
  };

  const handleClickOpen = (event, cellValues) => {
    setOpen(true);
    setOpenedQuest(cellValues);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenDetails(false);
    setOpenedQuest();
  };

  // Users Mgmt

  // Applications Mgmt

  // Articles Mgmt

  /* Quests Mgmt */
  const handleDeleteQuest = async () => {
    try {
      // eslint-disable-next-line
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
  let completedAtField;
  if (page === "quests") {
    if (path === "new") {
      completedAtField = "";
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
          width: 100,
          headerAlign: "center",
        },
        {
          field: "visibility",
          headerName: "Visibility",
          width: 100,
          headerAlign: "center",
        },
        {
          field: "wish",
          headerName: "Wish",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "Quest Details",
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
          width: 100,
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
      completedAtField = (
        <Typography sx={{ mt: "1.5em" }}>
          Quest Completion Date: {completedAt}
        </Typography>
      );
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
          width: 100,
          headerAlign: "center",
        },
        {
          field: "difficulty",
          headerName: "Difficulty",
          width: 90,
          headerAlign: "center",
        },
        {
          field: "visibility",
          headerName: "Visibility",
          width: 90,
          headerAlign: "center",
        },
        {
          field: "wish",
          headerName: "Wish",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "Quest Details",
          headerAlign: "center",
          width: 125,
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

      <Dialog open={openDetails} fullWidth>
        <DialogTitle>Quest Details </DialogTitle>
        <Stack spacing={1.5} sx={{ mt: "-1.5em" }}>
          <DialogContent>
            <Typography sx={{ mt: "1.5em" }}>Quest ID: {questId}</Typography>
            <Typography sx={{ mt: "1.5em" }}>
              Party Leader: {partyLeader}
            </Typography>
            <Typography sx={{ mt: "1.5em" }}>
              Quest Difficulty: {difficulty}
            </Typography>
            <Typography sx={{ mt: "1.5em" }}>
              Quest Visibility: {visibility}
            </Typography>
            <Typography sx={{ mt: "1.5em" }}>Quest Wish: {wish}</Typography>
            {completedAtField}
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
