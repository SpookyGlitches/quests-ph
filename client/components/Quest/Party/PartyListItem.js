import {
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import { deepOrange } from "@mui/material/colors";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

export default function PartyListItem(props) {
  const {
    item,
    rank,
    isPartyLeader,
    removePartyMember,
    banPartyMember,
    completed,
  } = props;

  return (
    <TableRow
      key={item.partyMemberId}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell>{rank} </TableCell>
      <TableCell align="center">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
            }}
          >
            {item.user.displayName[0]}
          </Avatar>
          <Typography variant="body2">{item.user.displayName}</Typography>
          {item.user.role === "mentor" && item.user.isActive === "1" && (
            <VerifiedUserRoundedIcon color="primary" sx={{ fontSize: 20 }} />
          )}
        </Box>
      </TableCell>

      <TableCell align="center">{item?.points}</TableCell>

      {isPartyLeader && (
        <TableCell align="center">
          <Tooltip title="Remove">
            <IconButton
              disabled={item.role === "PARTY_LEADER" || completed}
              onClick={() => removePartyMember(item.partyMemberId)}
            >
              <PersonRemoveAlt1RoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ban">
            <IconButton
              disabled={item.role === "PARTY_LEADER" || completed}
              onClick={() => banPartyMember(item.user.userId)}
            >
              <BlockRoundedIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
}
