import React from "react";
import {
  Box,
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
  IconButton,
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

  if (!partyBans) {
    return <div>Loading</div>;
  }

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
            <Table size="small" aria-label="ban table">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partyBans.map((partyBan) => (
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
                      <IconButton
                        onClick={() => revokeBan(partyBan.questPartyBanId)}
                      >
                        <RemoveCircleOutlineRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Box>
  );
}
