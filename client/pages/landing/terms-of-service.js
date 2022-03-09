import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../../components/Landing/Footer";
import Header from "../../components/Landing/Header";

export default function TermsOfService() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography
          variant="h3"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            color: "ffffff",
            mb: 5,
          }}
        >
          Terms of Service
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "left",
            color: "ffffff",
            mt: 3,
          }}
        >
          Effective Date: December 10, 2021
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 5,
          }}
        >
          Welcome to Quests. Please read to learn the rules and restrictions
          that govern your use of our website(s). If you have any questions,
          comments, or concerns regarding these terms or the Services, please
          contact us at:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 1,
          }}
        >
          <pre>Email: hello@quests.test</pre>
          <pre>Address: Prontera City, Capitol of Rune-Midgart</pre>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 3,
          }}
        >
          These Terms of User (the &quot;Terms&quot;) are a binding contract
          between you and Quests (&quot;Quests&quot;, &quot;we&quot;, and
          &quot;us&quot;). Your use of the Services in any way means that you
          agree to all of these Terms, and these Terms will remain in effect
          while you use the Services. These Terms include the provisions in this
          document as well as those in the Privacy Policy and any other relevant
          policies. Your use of or participation in certain Services may also be
          subject to additional policies, rules, and/or conditions
          (&quot;Additional Terms&quot;), which are incorporated herein by
          reference, and you understand and agree that by using or participating
          in any such Services, you agree to also comply with these Additional
          Terms.
        </Typography>

        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            color: "ffffff",
            mt: 5,
          }}
        >
          What are the basics of using Quests?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>

        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            color: "ffffff",
            mt: 2,
          }}
        >
          Will these Terms ever change?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Luctus
          venenatis lectus magna fringilla urna porttitor rhoncus dolor. Massa
          placerat duis ultricies lacus. Arcu dictum varius duis at consectetur
          lorem donec.
        </Typography>
      </Container>
      <Footer />
    </Box>
  );
}
