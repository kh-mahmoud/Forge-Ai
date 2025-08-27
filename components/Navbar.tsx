'use client'

import Image from "next/image";

import { Button } from "./ui/button";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { isLoaded } = useUser();

  return (
    <nav className="flex justify-between sticky top-0 items-center w-full  py-4  px-6 shadow-md z-50 bg-white">
      {/* Logo + Title */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Forge AI Logo"
          width={25}
          height={25}
          className="rounded-md"
        />
        <span className="text-2xl font-bold tracking-wide sm:flex hidden text-gray-800">
          Forge <span className="text-primary">AI</span>
        </span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {!isLoaded && <span className="text-gray-500 text-sm">Loading...</span>}

        <SignedOut>
          <div className="flex items-center gap-2">
            <Link href={"/sign-in"}>
              <Button>Sign in</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button variant="outline">Sign up</Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="scale-125 flex items-center justify-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
