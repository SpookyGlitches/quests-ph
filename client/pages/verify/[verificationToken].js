import prisma from "../../lib/prisma";
import AuthHeader from "../../components/Auth1/AuthHeader";
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
  const findEmail = await prisma.user.findFirst({
    where: {
      token,
    },
  });
  if (findEmail) {
    await prisma.user.update({
      where: {
        userId: findEmail.userId,
      },
      data: {
        verificationStatus: true,
      },
    });
    res.statusCode = 302;
    res.setHeader("Location", `/auth/login`); // Replace <link> with your url link
  }
  const data = JSON.parse(JSON.stringify(findEmail));
  return { props: { data } };
}

export default EmailVerificationPage;
