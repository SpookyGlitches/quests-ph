import {
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import { deepOrange } from "@mui/material/colors";

export default function PartyListItem({
  item,
  rank,
  isPartyLeader,
  removePartyMember,
  banPartyMember,
  userId,
}) {
  return (
    <TableRow
      key={item.partyMemberId}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell>{rank}</TableCell>
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
        </Box>
      </TableCell>

      <TableCell align="center">{item?.points}</TableCell>

      {isPartyLeader(userId) && (
        <TableCell align="center">
          <IconButton
            disabled={isPartyLeader(item.user.userId)}
            onClick={() => removePartyMember(item.partyMemberId)}
          >
            <PersonRemoveAlt1RoundedIcon />
          </IconButton>
          <IconButton
            disabled={isPartyLeader(item.user.userId)}
            onClick={() => banPartyMember(item.user.userId)}
          >
            <BlockRoundedIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}
