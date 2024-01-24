import Link from "next/link";
import SignUpForm from "./SignUpForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return (
    <section className="flex flex-col my-14">
      <div className="w-[500px] mx-auto bg-white py-5 px-4 rounded-md">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-medium text-gray-900">Sign Up</h1>
        </div>

        <div className="flex flex-col w-full gap-4">
          <SignUpForm />
          <div className="flex items-center gap-2 text-md font-medium">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
