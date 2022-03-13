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
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";

function createData(num, name, firstInitial, score, ban, kick) {
  return { num, name, firstInitial, score, ban, kick };
}

const rows = [
  createData(
    "1",
    "grapejuice",
    "g",
    100,

    <BlockRoundedIcon fontSize="small" style={{ color: "#757575" }} />,
    <PersonRemoveAlt1RoundedIcon
      fontSize="small"
      style={{ color: "#757575", marginLeft: "5px" }}
    />,
  ),
  createData(
    "2",
    "ur mom",
    "u",
    69,
    <BlockRoundedIcon fontSize="small" style={{ color: "#757575" }} />,
    <PersonRemoveAlt1RoundedIcon
      fontSize="small"
      style={{ color: "#757575", marginLeft: "5px" }}
    />,
  ),
  createData(
    "3",
    "arianaventi",
    "a",
    456,
    <BlockRoundedIcon fontSize="small" style={{ color: "#757575" }} />,
    <PersonRemoveAlt1RoundedIcon
      fontSize="small"
      style={{ color: "#757575", marginLeft: "5px" }}
    />,
  ),
  createData(
    "4",
    "catto",
    "c",
    312,
    <BlockRoundedIcon fontSize="small" style={{ color: "#757575" }} />,
    <PersonRemoveAlt1RoundedIcon
      fontSize="small"
      style={{ color: "#757575", marginLeft: "5px" }}
    />,
  ),
  createData(
    "5",
    "jettreviveme",
    "j",
    123,
    <BlockRoundedIcon fontSize="small" style={{ color: "#757575" }} />,
    <PersonRemoveAlt1RoundedIcon
      fontSize="small"
      style={{ color: "#757575", marginLeft: "5px" }}
    />,
  ),
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
        <Typography
          variant="h4"
          sx={{ color: "primary.main", marginTop: "0em" }}
        >
          Party
        </Typography>
        <Stack spacing={2}>
          <TableContainer sx={{ mb: 1, mt: 1 }}>
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell sx={{ paddingLeft: "5.3em" }}>User</TableCell>

                  <TableCell align="center">Points</TableCell>
                  <TableCell />
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
                        align="left"
                        sx={{ paddingLeft: "5em" }}
                        avatar={
                          <Avatar
                            sx={{
                              bgcolor: deepOrange[500],
                            }}
                          >
                            {row.firstInitial}
                          </Avatar>
                        }
                        title={row.name}
                      />
                    </TableCell>

                    <TableCell align="center">{row.score}</TableCell>
                    <TableCell align="center" sx={{}}>
                      {row.ban}
                      {row.kick}
                    </TableCell>
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
