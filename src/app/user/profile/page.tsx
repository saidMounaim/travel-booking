import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UserProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="max-w-3xl mx-auto">
      <div className="flex flex-col mt-11">
        <h1 className="text-2xl font-bold text-muted-foreground">My Profile</h1>
        <div className="flex flex-col gap-1 mt-5">
          <h3 className="text-1xl font-medium">{session?.user.name}</h3>
          <h6 className="text-1xl font-medium">{session?.user.email}</h6>
        </div>
      </div>
    </main>
  );
};

export default UserProfilePage;
