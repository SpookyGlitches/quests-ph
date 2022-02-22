import { Container, Typography, TextField, Button, Box } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import Carousel from "react-material-ui-carousel"

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

  return (
    <>
      <Head>
        <title>Quests</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Container fluid>
          <Box
            textAlign="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Item>
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                sx={{
                  width: "400px",
                  height: "600px",
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
            <Item>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "left",
                  mt: "7rem",
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
                Sign in to your account.
              </Typography>
              <div>
                <TextField
                  required
                  className={classes.root}
                  style={{ width: "80%", backgroundColor: "white" }}
                  id="filled-required"
                  label="Email Address"
                  sx={{
                    mt: "2rem",
                    ml: "-1em",
                    borderRadius: "0.5rem",
                  }}
                />
                <TextField
                  className={classes.root}
                  style={{ width: "80%", backgroundColor: "white" }}
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  sx={{
                    mt: "2rem",
                    ml: "-1rem",
                    borderRadius: "0.5rem",
                  }}
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
                  Sign In
                </Button>
              </div>
              <div>
                <Typography
                  sx={{
                    mt: "2rem",
                  }}
                >
                  Not yet registered?{" "}
                  <Link href="/">
                    <a style={{ color: "#18beff" }}>Create An Account</a>
                  </Link>
                </Typography>
              </div>
              <div>
                <Typography
                  sx={{
                    mt: "1rem",
                  }}
                >
                  Forgot Password?{" "}
                  <Link href="/">
                    <a style={{ color: "#18beff" }}>Click Here</a>
                  </Link>
                </Typography>
              </div>
            </Item>
          </Box>
        </Container>
      </main>
    </>
  )
}
