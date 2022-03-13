import { Typography, Stack, Button } from "@mui/material";

const FilterHolder = () => {
  return (
    <Stack sx={{ margin: "2rem" }} spacing={2} direction="row">
      <Button
        sx={{
          backgroundColor: "background.paper",
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      >
        <Typography sx={{ variant: "body1", fontWeight: 600, p: 0.75 }}>
          Outgoing
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: "background.paper",
          borderRadius: (theme) => theme.shape.borderRadius,
          fontWeight: 600,
        }}
      >
        <Typography sx={{ variant: "body1", fontWeight: 600, p: 0.75 }}>
          Incoming
        </Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: "background.paper",
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      >
        <Typography sx={{ variant: "body1", fontWeight: 600, p: 0.75 }}>
          Friends
        </Typography>
      </Button>
    </Stack>
  );
};

export default FilterHolder;
