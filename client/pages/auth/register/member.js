import AuthLayout from "../../../components/Layouts/AuthLayout";
import AuthHeader from "../../../components/Auth/AuthHeader";
import MemberRegistrationForm from "../../../components/Registration/MemberRegistrationForm";

export default function Register() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="Create an account" />
      <MemberRegistrationForm />
    </AuthLayout>
  );
}
