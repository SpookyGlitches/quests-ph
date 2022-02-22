import * as React from "react"
import { Grid, Typography, TextField, Button, Box } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import Carousel from "react-material-ui-carousel"
import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fafafa",
    },
  },
  typo: {
    justifyContent: "center",
  },
})

function Item(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        p: 1,
        m: 0,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 1,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  )
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default function Home() {
  const classes = useStyles()
  const [value, setValue] = React.useState(null)
  const color = "#858393"
  const handleChange = (newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Head>
          <title>Quests</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="main">
          <Grid
            container
            spacing={0}
            justify="flex-start"
            textAlign="center"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
              minHeight: "100vh",
            }}
          >
            <Grid item xs={12} sm={6} md={4} lg={4} order={{ xs: 3, sm: 2 }}>
              <Item>
                <Carousel
                  autoPlay
                  infiniteLoop
                  showThumbs={false}
                  sx={{
                    mb: "-1.9rem",
                  }}
                >
                  <div>
                    <img
                      alt="Quests"
                      src="http://www.math.uwaterloo.ca/~hdesterc/websiteW/personal/pictures/argentina2003/200311-set6/images/200311-set6_18_400x600.jpg"
                    />
                  </div>
                  <div>
                    <img
                      alt="Quests"
                      src="http://www.math.uwaterloo.ca/~hdesterc/websiteW/personal/pictures/argentina2003/200311-set8/images/200311-set8_4_400x600.jpg"
                    />
                  </div>
                  <div>
                    <img
                      alt="Quests"
                      src="https://www.brendansadventures.com/wp-content/uploads/2019/02/landscape-photography-9-400x600.jpg"
                    />
                  </div>
                </Carousel>
              </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} order={{ xs: 2, sm: 3 }}>
              <Item>
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "left",
                    mt: "2.5rem",
                    fontWeight: "bold",
                    ml: "1rem",
                    color: "#755CDE",
                  }}
                >
                  Quests
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    ml: "1rem",
                    color: "black",
                  }}
                >
                  Create an account.
                </Typography>
                <div>
                  <Button
                    style={{
                      borderRadius: 10,
                      minheight: "56px",
                      width: "80%",
                      backgroundColor: "white",
                      color: "black",
                    }}
                    variant="contained"
                    sx={{
                      mr: "1rem",
                      mt: "1rem",
                    }}
                  >
                    <img src="/assets/google.png" width="15" height="15" />{" "}
                    &nbsp; Sign Up with Google
                  </Button>
                </div>
                <div>
                  <Typography sx={{ mt: "1rem" }}>or</Typography>
                </div>
                <div>
                  <TextField
                    required
                    className={classes.root}
                    style={{ width: "80%", backgroundColor: "white" }}
                    id="filled-required"
                    label="Display Name"
                    sx={{
                      mt: "1rem",
                      ml: "-1em",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <TextField
                    required
                    className={classes.root}
                    style={{ width: "80%", backgroundColor: "white" }}
                    id="filled-required"
                    label="Full Name"
                    sx={{
                      mt: "1rem",
                      ml: "-1em",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
                <div>
                  <DatePicker
                    label="Birthday"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          svg: { color },
                          input: { color },
                          backgroundColor: "white",
                          borderColor: "white",
                          mt: "1rem",
                          ml: "-1em",
                          width: "80%",
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <Button
                    style={{
                      borderRadius: 10,
                      minheight: "56px",
                      width: "80%",
                    }}
                    variant="contained"
                    sx={{
                      mr: "1rem",
                      mt: "2rem",
                    }}
                  >
                    Next
                  </Button>
                </div>
                <div>
                  <Typography
                    sx={{
                      mt: "2rem",
                      mb: "3.2rem",
                    }}
                  >
                    <Link href="/login">
                      <a style={{ color: "#18beff" }}>
                        Already have an account?
                      </a>
                    </Link>
                  </Typography>
                </div>
              </Item>
            </Grid>
          </Grid>
        </main>
      </LocalizationProvider>
    </>
  )
}
