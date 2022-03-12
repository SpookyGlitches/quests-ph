import * as React from "react";
import AppLayout from "../../components/Layouts/AppLayout";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Search() {
  const [category, setCategory] = React.useState("");
  const [categorySubmit, setCategorySubmit] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeSubmitArticle = (event) => {
    setCategorySubmit(event.target.value);
  };

  return (
    <AppLayout>
      <Box sx={{ marginY: "1rem", width: "100%" }}>
        <Box
          style={{
            height: 100,
            display: "flex",

            padding: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "3em" }}
            onClick={handleClickOpen}
          >
            Submit Article
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography variant="h4" style={{ color: "#755cde" }}>
                Submit an Article
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ mt: -1 }}>
              <DialogContentText>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </Typography>
              </DialogContentText>

              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categorySubmit}
                  label="Category"
                  onChange={handleChangeSubmitArticle}
                  style={{ background: "white" }}
                >
                  <MenuItem value={1}>Health</MenuItem>
                  <MenuItem value={2}>Social</MenuItem>
                  <MenuItem value={3}>Career</MenuItem>
                </Select>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Link goes here"
                  type="link"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="primary"
                style={{
                  backgroundColor: "#B0B0B0",
                  borderColor: "#E8E8E8",
                  color: "white",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                onClick={handleClose}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <FormControl
            style={{
              maxWidth: 300,
              minWidth: 300,
              minHeight: 60,
              maxHeight: 60,
            }}
          >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
              style={{ background: "white" }}
            >
              <MenuItem value={1}>Health</MenuItem>
              <MenuItem value={2}>Social</MenuItem>
              <MenuItem value={3}>Career</MenuItem>
            </Select>
          </FormControl>
        </Box>

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
      </Box>
    </AppLayout>
  );
}
