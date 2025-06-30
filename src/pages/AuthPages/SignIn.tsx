import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title=" snapem SignIn Dashboard | Snap'em"
        description="This is snapem SignIn Tables Dashboard page for snap'em - signin page"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
