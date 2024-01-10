import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AuthButton from "./AuthButton";

const Navbar = () => {
  const cookieStore = cookies();
  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <nav className="w-full flex justify-center border-2 bg-[#D9D9D91D]/20 text-white rounded-md border-[#D9D9D91D]/20  h-16 my-10">
      <div className="w-full max-w-7xl flex justify-between items-center py-3 px-5 text-sm">
        <div className="text-lg font-bold">HomePage</div>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
};

export default Navbar;
