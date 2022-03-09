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
  Avatar,
  CardHeader,
  Button,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

function createData(num, name, firstInitial, score) {
  return { num, name, firstInitial, score };
}

const rows = [
  createData("1", "grapejuice", "g", 100),
  createData("2", "ur mom", "u", 69),
  createData("3", "arianaventi", "a", 456),
  createData("4", "catto", "c", 312),
  createData("5", "jettreviveme", "j", 123),
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
        <Typography variant="h4" sx={{ color: "#755cde", marginTop: "0em" }}>
          Party
        </Typography>
        <Stack spacing={2}>
          <TableContainer>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.num}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.num}
                    </TableCell>
                    <TableCell align="center" sx={{}} padding="none">
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{
                              bgcolor: deepOrange[500],
                              mr: -5,
                              ml: 5,
                            }}
                          >
                            {row.firstInitial}
                          </Avatar>
                        }
                        title={row.name}
                      />
                    </TableCell>
                    <TableCell align="right">{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box>
            <Button
              variant="outlined"
              color="primary"
              style={{
                maxWidth: "80px",
                minWidth: "80px",
                backgroundColor: "#E8E8E8",
                borderColor: "#E8E8E8",
                color: "#B0B0B0",
              }}
            >
              Leave
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ float: "right", maxWidth: "80px", minWidth: "80px" }}
            >
              Invite
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default partyList;
