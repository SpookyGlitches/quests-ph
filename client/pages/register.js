import * as React from "react"
import {
  Stack,
  TextField,
  Grid,
  Typography,
  Box,
  Button,
  Link as MuiLink,
} from "@mui/material"
import Carousel from "react-material-ui-carousel"
import MemberRegistrationOne from "../components/Registration/MemberRegistrationOne"
import Header from "../components/Registration/Header"
import Link from "next/link"
import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"

export default function Register() {
  const [value, setValue] = React.useState(null)
  const handleChange = (newValue) => {
    setValue(newValue)
  }
  const color = "#858393"
  return (
    <Grid
      container
      sx={{
        backgroundColor: "background.paper",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        order={{ xs: 3, sm: 2 }}
        sx={{ height: "100%", backgroundColor: "gray" }}
      >
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "#755CDE",
          }}
        >
          <img
            style={{ width: "auto", height: "auto%" }}
            alt="Quests"
            src="/assets/loginregister/carousel1.png"
          />

          <img
            style={{ width: "auto", height: "auto" }}
            alt="Quests"
            src="/assets/loginregister/carousel2.png"
          />

          <img
            style={{ width: "auto", height: "auto" }}
            alt="Quests"
            src="/assets/loginregister/carousel3.png"
          />
        </Carousel>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        order={{ xs: 2, sm: 3 }}
        sx={{ height: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            gap: 3,
            padding: {
              xs: "4rem",
              md: "7rem",
            },
          }}
        >
          <Header />
          <MemberRegistrationOne />
        </Box>
      </Grid>
    </Grid>
  )
}
