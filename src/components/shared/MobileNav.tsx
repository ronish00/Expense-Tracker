"use client";
import Link from "next/link";
import Container from "./Container";
import { useState } from "react";

const MobileNav = () => {
  const [nav, setNav] = useState(false);
  return (
    <>
      <header className="py-5 block md:hidden">
        <Container extraClass="flex items-center justify-between">
          <Link href={"/"}>
            <span className="text-2xl font-bold ">Expense Tracker</span>
          </Link>
          <button
            onClick={() => setNav(!nav)}
            className="flex flex-col justify-between w-6 h-2.5"
          >
            <span className="w-full h-0.5 bg-dark rounded-4xl"></span>
            <span className="w-full h-0.5 bg-dark rounded-4xl"></span>
          </button>
        </Container>
        <div
          className={`fixed top-0 p-10 bg-white h-screen w-2xs border-l-2 border-gray-200 transition-all ${
            nav ? "right-0" : "-right-full"
          }`}
        >
          <button
            onClick={() => setNav(!nav)}
            className="flex flex-col justify-between w-10 h-10 rounded-full bg-dark relative"
          >
            <span className="w-2/3 h-0.5 bg-white rounded-4xl absolute top-[19px] left-[7px]  rotate-45"></span>
            <span className="w-2/3 h-0.5 bg-white rounded-4xl absolute  top-[19px] left-[7px] -rotate-45"></span>
          </button>
          <nav className="flex flex-col gap-6 mt-16 w-full">
            <Link className="text-xl font-medium text-center w-full" href={"/"}>
              Home
            </Link>
            <Link
              className="text-xl font-medium text-center w-full"
              href={"/about"}
            >
              About
            </Link>
            <Link
              className="text-xl font-medium text-center w-full"
              href={"/contact"}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default MobileNav;
