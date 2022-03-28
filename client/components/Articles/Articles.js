import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
export default function Articles(props) {
  console.log(props.type);
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card
              sx={{
                mb: "1em",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/auth/banana.jpg"
                alt="sample pic"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lorem Ipsum Dolor Sit Amet Tis Uni 1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                display: "flex",
                mb: "1em",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <CardMedia
                component="img"
                alt="banana"
                src="/assets/banana.jpg"
                sx={{
                  width: { xs: "100%", sm: 100 },
                }}
              />
              <Box sx={{ alignSelf: "center", m: 2 }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: 10,
                  }}
                >
                  Lorem Ipsum Dolor Sit Amet Tis Uni
                </Typography>
              </Box>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <CardMedia
                component="img"
                alt="banana"
                src="/assets/banana.jpg"
                sx={{
                  width: { xs: "100%", sm: 100 },
                }}
              />
              <Box sx={{ alignSelf: "center", m: 2 }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: 10,
                  }}
                >
                  Lorem Ipsum Dolor Sit Amet Tis Uni
                </Typography>
              </Box>
            </Card>
            <Card
              sx={{
                display: "flex",
                mt: "1em",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <CardMedia
                component="img"
                alt="banana"
                src="/assets/banana.jpg"
                sx={{
                  width: { xs: "100%", sm: 100 },
                }}
              />
              <Box sx={{ alignSelf: "center", m: 2 }}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: 10,
                  }}
                >
                  Lorem Ipsum Dolor Sit Amet Tis Uni 2
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              sx={{
                mb: "1em",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/assets/banana.jpg"
                alt="sample pic"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lorem Ipsum Dolor Sit Amet Tis Uni 1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              sx={{
                mb: "1em",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/assets/banana.jpg"
                alt="sample pic"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lorem Ipsum Dolor Sit Amet Tis Uni 1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              sx={{
                mb: "1em",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="/assets/banana.jpg"
                alt="sample pic"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lorem Ipsum Dolor Sit Amet Tis Uni 1
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
