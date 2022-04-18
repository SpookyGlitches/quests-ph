import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardHeader,
  Avatar,
  Tooltip,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useRouter } from "next/router";
import useSWR from "swr";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import axios from "axios";

export default function BanList() {
  const router = useRouter();
  const { questId } = router.query;
  const { data: partyBans, mutate: mutatePartyBans } = useSWR(
    questId ? `/quests/${questId}/partyBans` : null,
  );

  const revokeBan = async (partyBanId) => {
    try {
      await axios.delete(`/api/quests/${questId}/partyBans/${partyBanId}`);
      const filtered = partyBans.filter(
        (item) => item.questPartyBanId !== partyBanId,
      );
      mutatePartyBans(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  if (!partyBans) {
    return <div>Loading</div>;
  }

  const partyBanItems = partyBans.map((partyBan) => (
    <TableRow
      key={partyBan.questPartyBanId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" padding="none">
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
              }}
            />
          }
          title={partyBan.user.displayName}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Revoke">
          <IconButton onClick={() => revokeBan(partyBan.questPartyBanId)}>
            <RemoveCircleOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));

  return (
    <Paper sx={{ padding: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ color: "primary.main" }}>
          Bans
        </Typography>
        <TableContainer emp>
          <Table size="small" aria-label="ban table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partyBans.length <= 0 ? (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell colSpan={2}>
                    <Typography align="center" variant="body2">
                      No results to show
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                partyBanItems
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  );
}
