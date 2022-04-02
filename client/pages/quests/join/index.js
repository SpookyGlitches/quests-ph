import { Box } from "@mui/material";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import AppLayout from "../../../components/Layouts/AppLayout";
import WoopModal from "../../../components/Quest/WoopModal";
import prisma from "../../../lib/prisma";

const Index = ({ error, token }) => {
  const router = useRouter();

  const modalDetails = {
    open: true,
    statement: {
      outcome: "",
      obstacle: "",
      plan: "",
      wish: token?.wish,
    },
  };

  const navigateToQuest = () => {
    router.push(`/quests/${token.questId}/`);
  };

  const submitForm = async (values) => {
    try {
      await axios.post(`/api/quests/${token.questId}/partyMembers`, {
        ...values,
        role: "MENTEE",
      });
      navigateToQuest();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={{ xs: 1, sm: 2, md: 3 }}>
      {error ? (
        <div>{error}</div>
      ) : (
        <WoopModal details={modalDetails} handleOk={submitForm} />
      )}
    </Box>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(context) {
  const { user } = await getSession(context);
  const { token } = context.query;
  if (!token) {
    return {
      redirect: {
        permanent: true,
        destination: `/quests`,
      },
    };
  }
  if (user.role === "mentor") {
    return {
      props: {
        error: "This link is not available for mentors.",
      },
    };
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.INVITE_PARTY_MEMBER_SECRET_KEY,
    );
    const existingMember = await prisma.partyMember.findFirst({
      where: {
        userId: user.userId,
        questId: verified.questId,
      },
    });

    if (existingMember) {
      return {
        redirect: {
          permanent: true,
          destination: `/quests/${verified.questId}`,
        },
      };
    }
    return {
      props: {
        token: verified,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        error: "The link is either expired or invalid.",
      },
    };
  }
}
