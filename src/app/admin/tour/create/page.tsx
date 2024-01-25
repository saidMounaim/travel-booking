import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreateTourForm from "./CreateTourForm";

const CreateTourPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.isAdmin) {
    return redirect("/");
  }

  return (
    <section className="flex flex-col my-11">
      <div className="w-[600px] mx-auto bg-white p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Create a Tour</h1>
          <div className="block">
            <CreateTourForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTourPage;
