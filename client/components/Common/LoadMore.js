import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import EndResults from "./EndResults";

export default function LoadMore({ hasMore, loading, onClick, rootStyles }) {
  const buttonItem = (
    <LoadingButton
      loading={loading}
      variant="text"
      disabled={loading}
      onClick={onClick}
    >
      Load More
    </LoadingButton>
  );

  const renderEnd = () => {
    if (loading) return null;
    return <EndResults />;
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", my: 3, ...rootStyles }}
    >
      {hasMore ? buttonItem : renderEnd()}
    </Box>
  );
}
