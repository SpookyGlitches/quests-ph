import React from "react";
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("1", "grapejuice", 100),
  createData("2", "ur mom", 69),
  createData("3", "arianaventi", 456),
  createData("4", "catto", 312),
  createData("5", "jettreviveme", 123),
];
const partyList = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          p: 1,
          m: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: "#755cde", marginTop: "-0.5em" }}>
          Party
        </Typography>
        <Stack spacing={2}>
          <TableContainer>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ paddingTop: "-1em" }}>
                  <TableCell>#</TableCell>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center" sx={{ mr: "1em" }}>
                      {row.calories}
                    </TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <FormGroup>
            <FormControlLabel
              sx={{ marginLeft: "2px" }}
              control={
                <Checkbox
                  sx={{
                    "&.MuiCheckbox-root": {
                      margin: 0,
                      padding: 0,
                    },
                  }}
                />
              }
              label="Task 2"
              checked
            />
          </FormGroup>

          <Typography>Today 11:50 PM</Typography>
          <Typography>30 pts</Typography>
          <AvatarGroup>
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
          </AvatarGroup>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <FormGroup>
            <FormControlLabel
              sx={{ marginLeft: "2px" }}
              control={
                <Checkbox
                  sx={{
                    "&.MuiCheckbox-root": {
                      margin: 0,
                      padding: 0,
                    },
                  }}
                />
              }
              label="Task 1"
              checked
            />
          </FormGroup>

          <Typography>Today 11:50 PM</Typography>
          <Typography>30 pts</Typography>

          <AvatarGroup>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepOrange[500] }}>
              RJ
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              EARL
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              JERBY
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              JERBY
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              JERBY
            </Avatar>
          </AvatarGroup>
          <Button variant="contained" color="primary">
            Invite
          </Button>
        </Grid> */}
      </Box>

      <Box
        sx={{
          p: 1,
          m: 1,
        }}
        spacing={3}
      ></Box>
    </Box>
  );
};

export default partyList;
