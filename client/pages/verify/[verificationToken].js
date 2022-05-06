import prisma from "../../lib/prisma";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthLayout from "../../components/Layouts/AuthLayout";
import GoBackHome from "../../components/Reset/GoBack";

const EmailVerificationPage = ({ data }) => {
  if (data === null) {
    return (
      <>
        <AuthLayout>
          <AuthHeader subtitle="You seem to be lost." />
          <GoBackHome />
        </AuthLayout>
        ;
      </>
    );
  }
  return <div />;
};
export async function getServerSideProps({ res, params }) {
  const token = params.verificationToken;
  const findToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
  if (findToken) {
    await prisma.user.update({
      where: {
        userId: findToken.userId,
      },
      data: {
        verificationStatus: true,
      },
    });
    res.statusCode = 302;
    res.setHeader("Location", `/auth/login`); // Replace <link> with your url link
  }
  const data = JSON.parse(JSON.stringify(findToken));
  return { props: { data } };
}

export default EmailVerificationPage;
