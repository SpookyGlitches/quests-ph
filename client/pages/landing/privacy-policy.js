import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import LandingLayout from "../../components/Layouts/LandingLayout";

export default function PrivacyPolicy() {
  return (
    <LandingLayout
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container component="main" sx={{ marginTop: 4, marginBottom: 8 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "left",
            mb: 5,
          }}
        >
          Privacy Policy
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "left",
          }}
        >
          Effective Date: April 18, 2022
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 5,
          }}
        >
          At Quests, we take your privacy seriously. Please read this Privacy
          Policy to learn how we treat your personal data. By using or accessing
          our Services in any manner, you acknowledge that you accept practices
          and policies outlined below, and you hereby consent that we will
          collect, use, and share your information as described in this Privacy
          Policy.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 3,
          }}
        >
          Remember that your use of Quests&rsquo; Services is at all times
          subject to our Terms of Service, which incorporates this Privacy
          Policy. Any terms we use in this Policy unfamiliar have definitions
          given to them in the Terms of Service.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "left",
            mt: 3,
          }}
        >
          If you have a disability, you may access this Privacy Policy in an
          alternative format by contacting questsappadm1@gmail.com.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: "left",
            mt: 5,
          }}
        >
          Privacy Policy Table of Contents
        </Typography>
        <Box
          sx={{
            textAlign: "left",
            mt: 2,
            ml: 2,
          }}
        >
          <li>
            <Link href="#first">
              {/* eslint-disable-next-line */}
              <a>Information That We Collect</a>
            </Link>
          </li>
          <li>
            <Link href="#second">
              {/* eslint-disable-next-line */}
              <a>How We Collect Your Information</a>
            </Link>
          </li>
          <li>
            <Link href="#third">
              {/* eslint-disable-next-line */}
              <a>From Who Do We Collect Information</a>
            </Link>
          </li>
          <li>
            <Link href="#fourth">
              {/* eslint-disable-next-line */}
              <a>How We Use Your Information</a>
            </Link>
          </li>
          <li>
            <Link href="#fifth">
              {/* eslint-disable-next-line */}
              <a>To Whom Do We Share Your Information</a>
            </Link>
          </li>
          <li>
            <Link href="#sixth">
              {/* eslint-disable-next-line */}
              <a>How We Protect Your Information</a>
            </Link>
          </li>
          <li>
            <Link href="#seventh">
              {/* eslint-disable-next-line */}
              <a>Rights and Access to Information</a>
            </Link>
          </li>
        </Box>
        <Typography
          id="first"
          variant="h5"
          sx={{
            textAlign: "left",

            mt: 10,
          }}
        >
          Information That We Collect
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          Here in Quests, we collect the following information: <br />
          <li>
            Personal Information: Name (Required only for mentors), email
            address, and date of birth.
          </li>
          <li>
            Mentorship Experience (for mentor applicants): Details of related
            mentorship experience and supporting documents such as your school
            study load and related certificates if applicable.
          </li>
          <li>
            Content you submit: Information regarding your Wishes, Obstacles,
            Outcomes, and Plans when using the Quests application.
          </li>
          <li>
            Actions you take: We collect information about the actions you do
            within the application such as comments, reacts, posts, article
            submissions, and user reports.
          </li>
          <li>
            Other Information: You may opt to provide other information for a
            particular situation such as contacting our administrators for
            support.
          </li>
        </Typography>
        <Typography
          id="second"
          variant="h5"
          sx={{
            textAlign: "left",

            mt: 5,
          }}
        >
          How We Collect Your Information
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          <li>
            Quests collects your information when you register through our
            respective registration sites for mentor and member.
          </li>
          <li>
            When you interact and use any of the functionalities in Quests.
          </li>
          <li>When you contact our administrators.</li>
        </Typography>
        <Typography
          id="third"
          variant="h5"
          sx={{
            textAlign: "left",

            mt: 5,
          }}
        >
          From Who Do We Collect Information
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          <li>Mentor Applicants</li>
          <li>Verified Mentors</li>
          <li>Current Members</li>
        </Typography>
        <Typography
          id="fourth"
          variant="h5"
          sx={{
            textAlign: "left",

            mt: 5,
          }}
        >
          How We Use Your Information
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          Quests uses your information to be able to perform different
          functionalities. Such functionalities include the mentorship system
          under the WOOP (Wish, Outcome, Obstacle, Plan) Method. We use your
          information only for the purpose for which it was collected and for
          other purposes required by law with your consent. We use your
          information to: <br />
          <li>Provide, maintain, and improve our services;</li>
          <li>Research and develop services;</li>
          <li>
            Protect the safety of Quests and its users which entails reporting
            of users and enforcing respective penalties depending on the
            severity of the offense.
          </li>
          <li>Provide customer support.</li>
        </Typography>
        <Typography
          id="fifth"
          variant="h5"
          sx={{
            textAlign: "left",

            mt: 5,
          }}
        >
          To Whom Do We Share Your Information
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          Quests may disclose your information as we believe to be necessary or
          appropriate: (a) under applicable law, including laws outside your
          country of residence; (b) to comply with legal process; (c) to respond
          to requests from public or government; (d) to enforce our terms and
          conditions and lastly, in accordance to the Data Privacy Act of 2012.{" "}
          <br />
          We may disclose limited information to people such as: <br />
          <li>Administrators</li>
          Aforementioned constituents are also required to use information for
          their primary purpose and keep such information confidential.
        </Typography>
        <Typography
          id="sixth"
          variant="h5"
          sx={{
            textAlign: "left",

            mt: 5,
          }}
        >
          How We Protect Your Information
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          Quests takes appropriate measures to maintain the safety of our
          users&apos; information and to protect information from loss. <br />
          <li>
            We store the information we collect as long as it is necessary for
            the purposes for which we collected it. Actions deemed proper are
            taken into consideration when information must be destroyed or
            disposed.
          </li>
          <li>
            Information may be destroyed upon request or under applicable law.
          </li>
        </Typography>
        <Typography
          id="seventh"
          variant="h5"
          sx={{
            textAlign: "left",

            mt: 5,
          }}
        >
          Rights and Access to Information
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
          }}
        >
          Quests sees the importance of the rights of our users with regards to
          the information they have given us. With this being said, we also
          honor the request of correction, update, or deletion if applicable.
          <br />
          Under the Data Privacy Act of 2012,
          <li>
            You may demand access to contents of your information that were
            processed;
          </li>
          <li>Names and addresses of the recipients of your data;</li>
          <li>Manner by which they were processed;</li>
          <li>Date when your data was last accessed and modified;</li>
          <li>Reasons for disclosure to recipients, if any.</li>
        </Typography>
      </Container>
    </LandingLayout>
  );
}
