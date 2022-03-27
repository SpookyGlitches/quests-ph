// // import * as React from "react";
// // import { Box, Button } from "@mui/material";

// // const Table = ({ tableData, headingColumns, page, path }) => {
// //   console.log(headingColumns);
// //   const finalTableData = tableData.map((row) => {
// //     const rowData = [];
// //     const keys = Object.keys(row);
// //     let i;
// //     let firstButtons;
// //     let secondButtons;

// //     switch (page) {
// //       case "users":
// //         firstButtons = (
// //           <Box>
// //             <Button variant="contained">Delete</Button>
// //           </Box>
// //         );
// //         break;
// //       case "applications":
// //         if (path === "new") {
// //           firstButtons = (
// //             <Box>
// //               <Button variant="contained">View</Button>
// //             </Box>
// //           );
// //           secondButtons = (
// //             <Box sx={{ display: "flex", flex: "column" }}>
// //               <Button variant="contained" sx={{ mr: 1 }}>
// //                 Approve
// //               </Button>
// //               <Button variant="contained">Reject</Button>
// //             </Box>
// //           );
// //           break;
// //         }
// //         break;
// //       case "articles":
// //         if (path === "new") {
// //           firstButtons = (
// //             <Box>
// //               <Button variant="contained" sx={{ mr: 3 }}>
// //                 Approve
// //               </Button>
// //               <Button variant="contained">Reject</Button>
// //             </Box>
// //           );
// //           break;
// //         } else if (path === "completed") {
// //           firstButtons = (
// //             <Box>
// //               <Button variant="contained">Delete</Button>
// //             </Box>
// //           );
// //           break;
// //         }
// //         break;
// //       case "quests":
// //         firstButtons = (
// //           <Box>
// //             <Button variant="contained">Delete</Button>
// //           </Box>
// //         );
// //         break;
// //       case "reports":
// //         if (path === "new") {
// //           firstButtons = (
// //             <Box>
// //               <Button variant="contained" sx={{ mr: 1 }}>
// //                 View
// //               </Button>
// //               <Button variant="contained">Delete</Button>
// //             </Box>
// //           );
// //           break;
// //         } else if (path === "ongoing") {
// //           firstButtons = (
// //             <Box>
// //               <Button variant="contained">View</Button>
// //             </Box>
// //           );
// //           secondButtons = (
// //             <Box>
// //               <Button variant="contained">Enable</Button>
// //             </Box>
// //           );
// //           break;
// //         } else if (path === "completed") {
// //           secondButtons = (
// //             <Box>
// //               <Button variant="contained" sx={{ ml: "-6em" }}>
// //                 Delete
// //               </Button>
// //             </Box>
// //           );
// //           break;
// //         }
// //         break;
// //       default:
// //         firstButtons = " ";
// //         secondButtons = " ";
// //         break;
// //     }

// //     for (i = 0; i < keys.length; i++) {
// //       rowData.push({
// //         key: headingColumns[i],
// //         val: row[keys[i]],
// //       });
// //     }
// //     // for (const key in row) {
// //     //   rowData.push({
// //     //     key: headingColumns[i],
// //     //     val: row[key],
// //     //   });
// //     //   i++;
// //     // }
// //     return (
// //       <>
// //         <tr key="row">
// //           {rowData.map((data) => (
// //             <td key={data.key} align="center">
// //               {data.val}
// //             </td>
// //           ))}
// //           <td>{firstButtons}</td>
// //           <td>{secondButtons}</td>
// //         </tr>
// //       </>
// //     );
// //   });

// //   return (
// //     <table
// //       className="table-container_table"
// //       style={{ marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto" }}
// //       cellSpacing="30"
// //     >
// //       <thead>
// //         <tr>
// //           {headingColumns.map((col) => (
// //             <th key="row">{col}</th>
// //           ))}
// //         </tr>
// //       </thead>
// //       <tbody>{finalTableData}</tbody>
// //     </table>
// //   );
// // };

// // export default Table;

// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Button } from "@mui/material";

// export default function DataGridDemo({
//   tableData,
//   headingColumns,
//   page,
//   path,
// }) {
//   const handleClick = (event, cellValues) => {
//     console.log(cellValues.row);
//   };
//   console.log(page);
//   if (page === "users") {
//     var columns = [
//       {
//         field: "username",
//         headerName: "First Name",
//         width: 130,
//       },
//       { field: "name", headerName: "Name", width: 130 },
//       {
//         field: "Print",
//         renderCell: (cellValues) => {
//           return (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={(event) => {
//                 handleClick(event, cellValues);
//               }}
//             >
//               Print
//             </Button>
//           );
//         },
//       },
//     ];
//   } else {
//     var columns = [
//       {
//         field: "username",
//         headerName: "First Name",
//         width: 130,
//       },
//       { field: "name", headerName: "Name", width: 130 },
//       // {
//       //   field: "Print",
//       //   renderCell: (cellValues) => {
//       //     return (
//       //       <Button
//       //         variant="contained"
//       //         color="primary"
//       //         onClick={(event) => {
//       //           handleClick(event, cellValues);
//       //         }}
//       //       >
//       //         Print
//       //       </Button>
//       //     );
//       //   },
//       // },
//     ];
//   }
//   // const columns = [
//   //   {
//   //     field: "username",
//   //     headerName: "First Name",
//   //     width: 130,
//   //   },
//   //   { field: "name", headerName: "Name", width: 130 },
//   //   {
//   //     field: "Print",
//   //     renderCell: (cellValues) => {
//   //       return (
//   //         <Button
//   //           variant="contained"
//   //           color="primary"
//   //           onClick={(event) => {
//   //             handleClick(event, cellValues);
//   //           }}
//   //         >
//   //           Print
//   //         </Button>
//   //       );
//   //     },
//   //   },
//   // ];
//   console.log(headingColumns);
//   console.log(tableData);
//   return (
//     <div style={{ height: 500, width: "100%" }}>
//       <DataGrid
//         rowHeight={120}
//         rows={tableData}
//         columns={columns}
//         pageSize={5}
//       />
//     </div>
//   );
// }
