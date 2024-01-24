"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import defaultUser from "../../../public/defaultuser.png";

interface DropdownUserProps {
  isAdmin: boolean;
}

const DropdownUser = ({ isAdmin }: DropdownUserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={defaultUser}
          alt="Default user"
          className="object-cover cursor-pointer"
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/user/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/user/mybooking">My Booking</Link>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem>
              <Link href="/admin/tour/create">Create a tour</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
