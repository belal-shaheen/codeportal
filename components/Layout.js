import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";

export default function Layout({ children }) {
  // const [user, setUser] = useState(null);
  const [session, loading] = useSession();

  return (
    <div className="">
      <div className="bg-gradient-to-r from-rose-400 to-orange-300">
        <nav className="p-6 border-b border-gray-300">
          <Link href="/">
            <span className="mr-6 cursor-pointer">Home</span>
          </Link>
          {session && (
            <Link href="/create-survey">
              <span className="mr-6 cursor-pointer">Create Survey</span>
            </Link>
          )}
          {session && (
            <Link href="/my-surveys">
              <span className="mr-6 cursor-pointer">My Surveys</span>
            </Link>
          )}
          {session && (
            <Link href="/api/auth/signout">
              <span className="mr-6 cursor-pointer  ">Sign Out</span>
            </Link>
          )}
          {!session && (
            <Link href="/api/auth/signin">
              <span className="mr-6 cursor-pointer">Sign In</span>
            </Link>
          )}
        </nav>
      </div>
      <div className=" h-screen overflow-x-auto ">
        <div className="py-8 px-16 ">{children}</div>
      </div>
    </div>
  );
}
