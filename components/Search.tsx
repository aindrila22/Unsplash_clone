"use client";

import Image from "next/image";
import React, { useState } from "react";
import search from "../assets/search.svg";

const Search = () => {
    const [searchInput, setSearchInput] = useState("")
    const handleSubmit =(e:any) =>{
       e.preventDefault();
       console.log("click", searchInput)
    }
  return (
    <div className="max-w-5xl grid place-items-center w-full mx-auto">
      <div className="lg:text-7xl md:text-5xl text-4xl text-center text-white leading-tight font-extrabold w-full">
        Discover over 2,000,000 free Stock Images
      </div>
      <form onSubmit={handleSubmit} className="border-2 bg-[#D9D9D91D]/20 w-full flex gap-3 justify-start items-center text-white rounded-md border-[#D9D9D91D]/20 h-16 my-10 max-w-3xl">
        <div className="border-white border-r py-1 px-4">
          <Image src={search} alt="" width={24} height={24}/>
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
          className="w-full outline-none py-2 px-3 text-base text-left bg-transparent"
          placeholder="Search"
        />
        <button type="submit" className="border-2 bg-[#D9D9D91D]/20 rounded-md text-base px-3 mr-3 py-1">GO!</button>
      </form>
      <div className="border-2 border-[#D9D9D91D]/20 px-4 py-2 rounded-md bg-[#D9D9D91D]/20 text-white text-base">Trending: flowers, love, forest, river</div>
    </div>
  );
};

export default Search;
