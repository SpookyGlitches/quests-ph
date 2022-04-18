import React, { useEffect, useState, useCallback } from "react";
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
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

const until = 6;
export default function Articles({ category, search }) {
  const [y, setY] = useState(document.scrollingElement.scrollHeight);
  const [pagination, setPagination] = useState({
    start: 0,
    end: until,
  });

  const handleNavigation = useCallback(
    // eslint-disable-next-line
    (e) => {
      if (y < window.scrollY) {
        setPagination((prev) => {
          return {
            start: 0,
            end: prev.end + 3,
          };
        });
      }
      setY(window.scrollY);
    },
    [y],
  );
  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const { data: articles } = useSWR(
    category
      ? `/articles/${category}/articlelist?search=${search || ""}`
      : null,
  );

  if (!articles) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10em",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  const finalArticles = articles.slice(pagination.start, pagination.end);
  return (
    <Box>
      <Grid container spacing={2}>
        {finalArticles.map((elem) => (
          <Grid item xs={4} key={finalArticles.indexOf(elem)}>
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
                  image="articles/quests-article.png"
                  alt={elem.provider}
                />
              ) : (
                <CardMedia
                  sx={{ height: 140 }}
                  image={elem.image}
                  alt={elem.provider}
                />
              )}

              <CardContent style={{ padding: 20 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {elem.title}
                </Typography>
              </CardContent>

              <CardActions style={{ padding: 12 }}>
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
      {pagination.end !== articles.length &&
      pagination.end < articles.length ? (
        <KeyboardDoubleArrowDownRoundedIcon
          color="primary"
          style={{ margin: "0 auto", display: "flex" }}
        />
      ) : (
        <Typography
          textAlign="center"
          color="primary"
          style={{ fontSize: "20px" }}
        >
          You have reached the end of the articles! &#127881;
        </Typography>
      )}
    </Box>
  );
}
