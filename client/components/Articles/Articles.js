import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

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
  return (
    <Box>
      <Grid container spacing={2}>
        {articles.map((elem) => (
          <Grid item xs={4} key={articles.indexOf(elem)}>
            <Card
              sx={{
                mb: "1em",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              {elem.image === undefined ? (
                <CardMedia
                  height="140"
                  image="articles/quests-article.png"
                  alt={elem.provider}
                />
              ) : (
                <CardMedia
                  height="140"
                  image={elem.image}
                  alt={elem.provider}
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {elem.title}
                </Typography>
              </CardContent>

              <CardActions>
                <MuiLink
                  sx={{ cursor: "pointer", ml: 1, mb: 2 }}
                  style={{ textDecoration: "none" }}
                >
                  <Link href={`${elem.url}`} passHref>
                    <a href="replace" target="_blank">
                      Read More
                    </a>
                  </Link>
                </MuiLink>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
