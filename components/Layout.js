import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../api";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(checkUser);
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }

  return (
    <div className="">
      <div className="bg-gradient-to-r from-rose-400 to-orange-300">
        <nav className="p-6 border-b border-gray-300">
          <Link href="/">
            <span className="mr-6 cursor-pointer">Home</span>
          </Link>
          {user && (
            <Link href="/create-survey">
              <span className="mr-6 cursor-pointer">Create Survey</span>
            </Link>
          )}
          {user && (
            <Link href="/my-surveys">
              <span className="mr-6 cursor-pointer">My Surveys</span>
            </Link>
          )}
          <Link href="/profile">
            <span className="mr-6 cursor-pointer">Profile</span>
          </Link>
        </nav>
      </div>
      <div className="bg-yellow-50 h-screen overflow-x-auto ">
        <div className="py-8 px-16 ">{children}</div>
      </div>
    </div>
  );
}
