// import {
//   Stack,
//   Card,
//   Typography,
//   CardHeader,
//   Box,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
// } from "@mui/material";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import useSWR from "swr";
// import QuestItem from "../../Quest/QuestItem";

// export default function FriendQuestList({ userId }) {
//   const [dataTable, setDataTable] = useState([]);
//   const [category, setCategory] = useState(0);
//   const [categoryNum, setCategoryNum] = useState(0);
//   // const { data: friendQuests } = useSWR(
//   //   userId ? `/profile/${userId}/friendquestslist` : null,
//   // );
//   // if (!friendQuests) {
//   //   return (
//   //     <div
//   //       style={{
//   //         display: "flex",
//   //         justifyContent: "center",
//   //         alignItems: "center",
//   //       }}
//   //     />
//   //   );
//   // }
//   // console.log(friendQuests);

//   const { data: friendPartyQuests } = useSWR(
//     userId ? `/profile/${userId}/friendquestslistparty` : null,
//   );
//   if (!friendPartyQuests) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       />
//     );
//   }
//   console.log(friendPartyQuests);
//   const inner = friendPartyQuests.map((e) => {
//     return e.questId;
//   });

//   console.log(inner);
//   // const gatherData = (val) => {
//   //   if (val === 0) {
//   //     axios
//   //       .get("/api/profile/questlist", {
//   //         params: {
//   //           categoryNum: 0,
//   //         },
//   //       })
//   //       .then((res) => {
//   //         setDataTable(res.data);
//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //       });
//   //   } else {
//   //     axios
//   //       .get("/api/profile/questlist", {
//   //         params: {
//   //           categoryNum: 1,
//   //         },
//   //       })
//   //       .then((res) => {
//   //         setDataTable(res.data);
//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //       });
//   //   }
//   // };
//   const handleChange = (event) => {
//     console.log(event.target.value);
//     //   setCategory(event.target.value);
//     //   setCategoryNum(event.target.value);
//     //   gatherData(event.target.value);
//   };

//   // useEffect(() => {
//   //   gatherData(categoryNum);
//   //   // eslint-disable-next-line
//   // }, []);

//   return (
//     <Box
//       sx={{
//         backgroundColor: "background.paper",
//         borderRadius: 2,
//         padding: "1rem",
//       }}
//     >
//       <Box
//         style={{
//           height: 100,
//           display: "flex",

//           padding: 1,
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography
//           align="left"
//           variant="h4"
//           sx={{ mt: "-2rem", ml: "0.2rem" }}
//         >
//           Quests
//         </Typography>
//         <FormControl
//           style={{ width: "50%" }}
//           sx={{ mt: "-2rem", mr: "0.2rem" }}
//         >
//           <InputLabel id="demo-simple-select-label">Category</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={category}
//             label="Category"
//             onChange={handleChange}
//             style={{ background: "white" }}
//           >
//             <MenuItem value={0}>Active</MenuItem>
//             <MenuItem value={1}>Inactive</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Box
//         sx={{
//           position: "relative",
//           padding: "0.2rem",
//           "& canvas": {
//             width: "100%!important",
//             maxHeight: "10rem!important",
//           },
//         }}
//       >
//         {/* {friendQuests.map((item) => (
//           <QuestItem
//             key={item.questId}
//             quest={item}
//             onJoinClick={(event) => toggleModal(event, item)}
//             navigate={() => {
//               navigateToQuest(`/quests/${item.questId}`);
//             }}
//           />
//         ))} */}
//         {/* {dataTable.map((elem) => (
//             <Stack
//               item
//               xs={3}
//               key={dataTable.indexOf(elem)}
//               spacing={2}
//               sx={{ mb: 2 }}
//             >
//               <Card>
//                 <CardHeader
//                   title={`${elem.wish}`}
//                   subheader={`${elem.category}`}
//                 />
//               </Card>
//             </Stack>
//           ))} */}
//       </Box>
//     </Box>
//   );
// }
