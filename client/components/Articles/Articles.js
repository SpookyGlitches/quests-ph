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
import { makeStyles } from "@mui/styles";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";

const until = 6;
export default function Articles({ category }) {
  const [y, setY] = useState(document.scrollingElement.scrollHeight);
  // eslint-disable-next-line
  const [scrollDirection, setScrollDirection] = useState("Null Scroll");
  const [pagination, setPagination] = useState({
    start: 0,
    end: until,
  });

  const handleNavigation = useCallback(
    // eslint-disable-next-line
    (e) => {
      if (y > window.scrollY) {
        setScrollDirection("Scrolling Up");
      } else if (y < window.scrollY) {
        setScrollDirection("Scrolling Down");
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

  const useStyles = makeStyles(() => ({
    media: {
      height: 140,
    },
  }));

  const classes = useStyles();

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
                  className={classes.media}
                  image="articles/quests-article.png"
                  alt={elem.provider}
                />
              ) : (
                <CardMedia
                  className={classes.media}
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
