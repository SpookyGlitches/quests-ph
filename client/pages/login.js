// import Head from "next/head"
// import styles from "../styles/Home.module.css"

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <div>this login bro</div>
//     </div>
//   )
// }

import { Card, Grid, Typography, Paper } from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import styled from "styled-components"

import Carousel from "react-material-ui-carousel"

import styles from "../styles/login.css"

export default function Home() {
  return (
    // <HomeWrapper>
    <>
      <Head>
        <title>Quests</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={6}>
            <Card
              sx={{
                margin: "2rem",
                ml: "5rem",
                maxWidth: "500px",
              }}
            >
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                sx={{
                  maxWidth: "500px",
                  maxHeight: "500px",
                }}
              >
                <div>
                  <img
                    alt="Quests"
                    src="https://i.pinimg.com/originals/e5/8f/52/e58f521070bf76ac69d583923b499012.gif"
                  />
                </div>
                <div>
                  <img
                    alt="Quests"
                    src="https://i.pinimg.com/originals/e5/8f/52/e58f521070bf76ac69d583923b499012.gif"
                  />
                </div>
                <div>
                  <img
                    alt="Quests"
                    src="https://i.pinimg.com/originals/e5/8f/52/e58f521070bf76ac69d583923b499012.gif"
                  />
                </div>
              </Carousel>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                ml: "-6.5rem",
                mr: "5rem",
                padding: "0.8rem",
                pt: "-10rem",
                border: "1px solid #eaeaea",
                maxWidth: "1000px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h2">signin bruh</Typography>
              <Typography paragraph>
                login form here ajajaja login form here ajajaja login form here
                ajajaja login form here ajajaja login form here ajajaja login
                form here ajajaja login form here ajajaja login form here
                ajajaja login form here ajajaja login form here ajajaja login
                form here ajajaja login form here ajajaja login form here
                ajajaja login form here ajajaja login form here ajajaja login
                form here ajajaja login form here ajajaja login form here
                ajajaja login form here ajajaja login form here ajajaja login
                form here ajajaja login form here ajajaja login form here
                ajajaja login form here ajajaja login form here ajajaja login
                form here ajajaja login form here ajajaja login form here
                ajajajalogin form here ajajaja login form here ajajaja login
                form here ajajaja login form here ajajaja login form here
                ajajaja login form here ajajaja login form here ajajajalogin
                form here ajajaja login form here ajajaja login form here
                ajajaja login form here ajajaja login form here ajajaja login
                form here ajajaja login form here asdasdaaasa
                yaweyusdghjsafaujiksdfghvjksdhfksdahfjksdafhfghvjksdhfksdahfjksdafhfgh
                vjksdhfksdahfjksdafhfghvjksdhfksdahfjksdafhfghvjksdhfksdahfjksdafh
                fghvjksdhfksdahfjksdafh fghvjksdhfksdahfjksdafh
                fghvjksdhfksdahfjksdafh
                fghvjksdhfksdahfjksdafhfghvjksdhfksdahfjksdafh
                fghvjksdhfksdahfjksdafhfghvjksdhfksdahfjksd afhfg
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </main>
    </>
  )
}
