import * as React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

const Table = ({ tableData, headingColumns, page, path }) => {
  const finalTableData = tableData.map((row) => {
    const rowData = [];
    const keys = Object.keys(row);
    let i;
    let firstButtons;
    let secondButtons;

    switch (page) {
      case "users":
        firstButtons = (
          <Box>
            <Button variant="contained">Delete</Button>
          </Box>
        );
        break;
      case "applications":
        if (path === "new") {
          firstButtons = (
            <Box>
              <Button variant="contained">View</Button>
            </Box>
          );
          secondButtons = (
            <Box sx={{ display: "flex", flex: "column" }}>
              <Button variant="contained">Approve</Button>
              <Button variant="contained">Reject</Button>
            </Box>
          );
          break;
        }
        break;
      case "articles":
        if (path === "new") {
          firstButtons = (
            <Box>
              <Button variant="contained">Approve</Button>
              <Button variant="contained">Reject</Button>
            </Box>
          );
          break;
        } else if (path === "completed") {
          firstButtons = (
            <Box>
              <Button variant="contained">Delete</Button>
            </Box>
          );
          break;
        }
        break;
      case "quests":
        firstButtons = (
          <Box>
            <Button variant="contained">Delete</Button>
          </Box>
        );
        break;
      case "reports":
        if (path === "new") {
          firstButtons = (
            <Box>
              <Button variant="contained">View</Button>
              <Button variant="contained">Delete</Button>
            </Box>
          );
          break;
        } else if (path === "ongoing") {
          firstButtons = (
            <Box>
              <Button variant="contained">View</Button>
            </Box>
          );
          secondButtons = (
            <Box>
              <Button variant="contained">Enable</Button>
            </Box>
          );
          break;
        } else if (path === "completed") {
          secondButtons = (
            <Box>
              <Button variant="contained">Delete</Button>
            </Box>
          );
          break;
        }
        break;
      default:
        firstButtons = " ";
        secondButtons = " ";
        break;
    }

    for (i = 0; i < keys.length; i++) {
      rowData.push({
        key: headingColumns[i],
        val: row[keys[i]],
      });
    }
    // for (const key in row) {
    //   rowData.push({
    //     key: headingColumns[i],
    //     val: row[key],
    //   });
    //   i++;
    // }
    return (
      <tr key="row">
        {rowData.map((data) => (
          <td key={data.key} align="center">
            {data.val}
          </td>
        ))}
        <td>{firstButtons}</td>
        <td>{secondButtons}</td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table className="table-container_table" style={{ marginTop: "1.5rem" }}>
        <thead>
          <tr>
            {headingColumns.map((col) => (
              <th key="row">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{finalTableData}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Table;
