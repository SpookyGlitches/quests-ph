import prisma from "../../lib/prisma";

const EmailVerificationPage = () => {
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
  return { props: { message: `Next.js is awesome` } };
}

export default EmailVerificationPage;
