import { Box } from "@mui/material";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import AppLayout from "../../../components/Layouts/AppLayout";
import WoopModal from "../../../components/Quest/WoopModal";

const Index = ({ error, token }) => {
  const router = useRouter();
  const session = useSession();

  const modalDetails = {
    open: true,
    statement: {
      outcome: "",
      obstacle: "",
      plan: "",
      wish: token?.wish,
    },
  };

  const getRole = () => {
    const role = session?.user?.role;
    switch (role) {
      case "mentor":
        return "MENTOR";
      default:
        return "MENTEE";
    }
  };

  const navigateToQuest = () => {
    router.push(`/quests/${token.questId}/`);
  };

  const submitForm = async (values) => {
    const mappedRole = getRole();
    try {
      await axios.post(`/api/quests/${token.questId}/partyMembers`, {
        ...values,
        role: mappedRole,
      });
      navigateToQuest();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={{ xs: 1, sm: 2, md: 3 }}>
      {!error && <WoopModal details={modalDetails} handleOk={submitForm} />}
    </Box>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ query }) {
  const { token } = query;
  if (!token) {
    return {
      redirect: {
        permanent: true,
        destination: `/quests`,
      },
    };
  }
  try {
    const verified = jwt.verify(
      token,
      process.env.INVITE_PARTY_MEMBER_SECRET_KEY,
    );
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
