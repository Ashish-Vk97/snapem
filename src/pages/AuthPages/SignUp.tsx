import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Snapem Signup page | Snap'em "
        description="This is React.js SignUp Tables Dashboard page for snap'em "
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
