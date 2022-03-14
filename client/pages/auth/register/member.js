import AuthLayout from "../../../components/Layouts/AuthLayout";
import AuthHeader from "../../../components/Auth/AuthHeader";
import RegistrationForm from "../../../components/Registration/RegistrationForm";

export default function Register() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="Create an account" />
      <RegistrationForm />
    </AuthLayout>
  );
}
