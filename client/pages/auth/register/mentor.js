import AuthLayout from "../../../components/Layouts/AuthLayout";
import AuthHeader from "../../../components/Auth/AuthHeader";
import MentorRegistrationForm from "../../../components/Registration/MentorRegistrationForm";

export default function Register() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="Create an account" />
      <MentorRegistrationForm />
    </AuthLayout>
  );
}
