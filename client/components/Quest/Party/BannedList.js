import React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardHeader,
  Avatar,
  Stack,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { deepOrange } from "@mui/material/colors";
function createData(num, name, button) {
  return { num, name, button };
}

const rows = [
  createData(
    "1",
    "watamesheep",
    <Button
      variant="outlined"
      color="primary"
      style={{
        backgroundColor: "#E8E8E8",
        borderColor: "#E8E8E8",
        color: "#B0B0B0",
      }}
    >
      Revoke
    </Button>,
  ),
  createData(
    "2",
    "wewewew",
    <Button
      variant="outlined"
      color="primary"
      style={{
        backgroundColor: "#E8E8E8",
        borderColor: "#E8E8E8",
        color: "#B0B0B0",
      }}
    >
      Revoke
    </Button>,
  ),
];
const banList = () => {
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
          Bans
        </Typography>
        <Stack spacing={2}>
          <TableContainer sx={{ mb: 0, mt: 0 }}>
            <Table
              sx={{
                minWidth: 100,
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
              }}
              size="small"
              aria-label="ban table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.num}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{
                              bgcolor: deepOrange[500],
                            }}
                          ></Avatar>
                        }
                        title={row.name}
                      />
                    </TableCell>
                    <TableCell align="right">{row.button}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Box>
  );
};

export default banList;
