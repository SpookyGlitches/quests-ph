import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";

export default function Articles({ category }) {
  const { data: articles } = useSWR(
    category ? `/articles/${category}/articlelist` : null,
  );
  if (!articles) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  console.log(articles);

  return (
    <Box>
      <Grid container spacing={2}>
        {articles.map((elem) => (
          <Grid item xs={3} key={articles.indexOf(elem)}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={elem.image}
                alt="green iguana"
              />
              <CardHeader title={`${elem.title}`} />
              <CardActions>
                <Button>Read More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
