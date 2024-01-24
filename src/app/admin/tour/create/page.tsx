import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CreateTourPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.isAdmin) {
    return redirect("/");
  }

  return (
    <div>
      <h1>Create Tour Page</h1>
    </div>
  );
};

export default CreateTourPage;
