"use client";

import { useUser } from "@/context/UserContext";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {

  const user = useUser();

  return (
    <header className="py-5">
      <nav className="flex items-center justify-between lg:max-w-6xl mx-auto lg:px-8 px-6">
        <Link href={"/"}>
          <span className="text-2xl font-bold ">Expense Tracker</span>
        </Link>
        <div>
          {user ? (
            <UserButton showName />
          ) : (
            <Link
              className="bg-dark px-4 py-2 font-medium text-sm text-white rounded-lg"
              href={"/sign-in"}
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
