
import AuthForm from "@/components/AuthForm";

const Login = () => {
  return (
    <div className="container flex min-h-[80vh] items-center justify-center py-12">
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
