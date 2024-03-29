"use client";

import Link from "next/link";
import React, { useState } from "react";

const Nav = ({ user, signout }: any) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="md:hidden block w-full">
        {user ? (
          <div className="flex justify-end items-center gap-4 sm:text-sm lg:text-base text-xs">
            <button
              className=" p-2 focus:outline-none text-2xl"
              onClick={() => setDrawerOpen(!isDrawerOpen)}
            >
              ☰
            </button>
            {isDrawerOpen && (
              <div className=" fixed top-0 left-0 w-full h-full bg-black">

                <div className="px-5 flex flex-col gap-4 h-screen text-base pt-10 bg-black text-white">
                <div
                  onClick={() => setDrawerOpen(false)}
                  className="py-4 px-6 text-right text-xl cursor-pointer "
                >
                  X
                </div>
                  {user && (
                    <div className="flex flex-col ">
                      <div className="py-10 "> Hey, {user.email}!</div>
                      <Link
                        className="pb-10"
                        onClick={() => setDrawerOpen(false)}
                        href={"/"}
                      >
                        Home
                      </Link>
                      <Link
                        onClick={() => setDrawerOpen(false)}
                        href={"/favorites"}
                      >
                        Favorites
                      </Link>

                      <form className="py-10" action={signout}>
                        <button className="py-2 px-4 border border-white rounded-md font-medium">
                          Logout
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-auto justify-end items-center px-4 gap-6 sm:text-sm lg:text-lg text-xs">
            <div className="flex justify-end items-center gap-4 sm:text-sm lg:text-base text-xs">
              <button
                className=" p-2 focus:outline-none text-2xl"
                onClick={() => setDrawerOpen(!isDrawerOpen)}
              >
                ☰
              </button>
            </div>
            {isDrawerOpen && (
              <div className=" fixed top-0 left-0 w-full h-full bg-black">

                <div className="px-5 flex flex-col gap-4 text-base pt-10 h-screen bg-black text-white">
                <div
                  onClick={() => setDrawerOpen(false)}
                  className="py-4 px-6 text-right text-xl cursor-pointer"
                >
                  X
                </div>
                  <Link
                    href="/login"
                    onClick={() => setDrawerOpen(false)}
                    className="py-2 px-3 mb-10 text-lg flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                  >
                    Login
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setDrawerOpen(false)}
                    className="py-2 px-3 border border-white font-medium flex rounded-md no-underline "
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:block hidden w-full">
        {user ? (
          <div className="hidden sm:flex items-center gap-4">
            Hey, {user.email}!<Link href={"/favorites"} className="text-base font-bold px-4">Favorites</Link>
            <form action={signout}>
              <button className="py-2 px-4 border border-white rounded-md font-medium">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <div className="hidden sm:flex w-auto justify-end items-center gap-6 sm:text-sm lg:text-lg text-xs">
            <Link
              href="/login"
              className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="py-2 px-3 border border-white font-medium flex rounded-md no-underline "
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
