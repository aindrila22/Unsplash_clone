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
    <>
    <nav className="w-full hidden md:flex justify-center border-2 bg-[#D9D9D91D]/30 text-white rounded-md border-[#D9D9D91D]/50 backdrop-blur-lg  h-16 my-10">
      <div className="w-full max-w-7xl flex justify-between items-center py-3 px-5 text-sm">
        <div className="text-lg font-bold">HomePage</div>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
    <nav className="w-full md:hidden fixed top-0 left-0 flex justify-center border-2 bg-[#D9D9D91D]/30 text-white rounded-md border-[#D9D9D91D]/50 backdrop-blur-lg z-50 h-20 mb-20">
      <div className="w-full max-w-7xl flex justify-between items-center py-3 px-5 text-sm">
        <div className="text-lg font-bold">HomePage</div>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
