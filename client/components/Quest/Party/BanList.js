import React, { useContext, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardHeader,
  Tooltip,
  Stack,
  IconButton,
  Paper,
} from "@mui/material";
import useSWR from "swr";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import axios from "axios";
import { QuestContext } from "../../../context/QuestContext";
import CustomCircularProgress from "../../Common/CustomSpinner";
import CustomAvatar from "../../Common/CustomAvatar";
import PopConfirm from "../../Common/PopConfirm";

export default function BanList() {
  const { questId, completedAt } = useContext(QuestContext);
  const { data: partyBans, mutate: mutatePartyBans } = useSWR(
    questId ? `/quests/${questId}/partyBans` : null,
  );

  const completed = Boolean(completedAt);

  const [confirmModalState, setConfirmModalState] = useState({
    handleOk: () => {},
    open: false,
  });

  const closeModal = () => {
    setConfirmModalState((prev) => ({ ...prev, open: false }));
  };

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

  const openModalForRevoke = (partyBanId) => {
    setConfirmModalState({
      open: true,
      handleOk: () => revokeBan(partyBanId),
    });
  };

  if (!partyBans) {
    return <CustomCircularProgress rootStyles={{ minHeight: 100 }} />;
  }

  const partyBanItems = partyBans.map((partyBan) => (
    <TableRow
      key={partyBan.questPartyBanId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" padding="none">
        <CardHeader
          avatar={
            <CustomAvatar
              displayName={partyBan.user.displayName}
              image={partyBan.user.image}
            />
          }
          title={partyBan.user.displayName}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Revoke">
          <IconButton
            onClick={() => openModalForRevoke(partyBan.questPartyBanId)}
            disabled={completed}
          >
            <RemoveCircleOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));

  return (
    <Paper sx={{ padding: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ color: "primary.main" }}>
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
      <PopConfirm
        open={confirmModalState.open}
        subtitle="The user will be able to join again when revoked. Proceed?"
        title="Are you sure you want to revoke ban?"
        handleOk={confirmModalState.handleOk}
        handleCancel={closeModal}
      />
    </Paper>
  );
}
