import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import DropdownUser from "./DropdownUser";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white border py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-gray-500 font-bold text-2xl">
            Travel Booking
          </Link>
          <nav className="flex flex-col">
            <ul className="flex items-center gap-6">
              <li className="text-md text-gray-950 font-medium">
                <Link href="/">Home</Link>
              </li>
              <li className="text-md text-gray-950 font-medium">
                <Link href="/about">About</Link>
              </li>
              <li className="text-md text-gray-950 font-medium">
                <Link href="/tours">Tours</Link>
              </li>
              <li className="text-md text-gray-950 font-medium">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-6">
            {session?.user ? (
              <DropdownUser isAdmin={session?.user.isAdmin} />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-md text-gray-950 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-700 text-md font-medium py-2 px-4 text-white rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
