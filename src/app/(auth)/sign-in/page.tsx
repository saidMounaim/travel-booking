import Link from "next/link";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <section className="flex flex-col my-14">
      <div className="w-[500px] mx-auto bg-white py-5 px-4 rounded-md">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-medium text-gray-900">Sign In</h1>
        </div>

        <div className="flex flex-col w-full gap-4">
          <SignInForm />
          <div className="flex items-center gap-2 text-md font-medium">
            Don’t have an account yet?{" "}
            <Link href="/sign-up" className="text-blue-600">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
