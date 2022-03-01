import { Typography } from "@mui/material";

export default function AuthHeader({ title, subtitle }) {
  return (
    <div>
      <Typography variant="h4" color="primary">
        {title || "Quests"}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </div>
  );
}
