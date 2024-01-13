"use client";

import Image from "next/image";
import React, { useState } from "react";
import search from "../assets/search.svg";
import axios from "axios";
import BouncingLoader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "@/redux/slice/image";
import { RootState } from "@/redux/store";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import IDetails from "./IDetails";

const Search = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [selectedObject, setSelectedObject] = useState(null);

  const handleOpenImage = (elem:any) =>{
    setSelectedObject(elem);
  }
  const handleClose = () =>{
    setSelectedObject(null);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("https://pixabay.com/api/", {
        params: {
          key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY,
          q: `${searchInput}`,
          image_type: "photo",
          orientation: "horizontal",
        },
      });
      const data = response.data;

      dispatch(setImages(data.hits));
      setQuery(searchInput);

    } catch (error: any) {
      console.error("Error setting up the request", error.message);
    } finally {
      setLoading(false);
      setSearchInput("");
    }
  };
  const images = useSelector((state: RootState) => state.images.images);

  return (
    <>
      <div className="max-w-5xl grid place-items-center w-full mx-auto px-5 md:px-0">
        {images.length <= 0 && (
          <div className="lg:text-7xl md:text-5xl text-3xl mt-10 text-center text-white leading-tight font-extrabold w-full">
            Discover over 2,000,000 free Stock Images
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="border-2 bg-[#D9D9D9]/10 backdrop-blur-lg w-full flex gap-3 justify-start items-center text-white rounded-md border-[#D9D9D9]/70 h-16 my-10 max-w-3xl"
        >
          <div className="border-white border-r-2 py-1 px-4">
            <Image src={search} alt="" width={24} height={24} />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full outline-none py-2 px-3 text-white placeholder-slate-100 text-lg text-left bg-transparent"
            placeholder="Search"
          />
          <button
            type="submit"
            className="border-2 bg-[#D9D9D9]/10 backdrop-blur-lg rounded-md text-base px-3 mr-3 py-1"
          >
            GO!
          </button>
        </form>
        {(!images || images.length === 0) && (
          <div className="border-2 border-[#D9D9D9]/70 px-4 py-2 rounded-md bg-[#D9D9D9]/10 backdrop-blur-lg text-white text-base">
            Trending: flowers, love, forest, river
          </div>
        )}
        {images.length > 0 && (
          <div className="font-bold my-10 text-2xl text-white backdrop-blur-lg px-4 py-2">
            Results : {query}
          </div>
        )}
        {loading && <BouncingLoader />}
      </div>
      {images.length > 0 && (
        <div className="w-full bg-white block h-full p-6">
          {!loading && images && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
            >
              <Masonry gutter="4">
                {images.map((elem, idx) => (
                  <div onClick={()=>handleOpenImage({elem})} key={idx} className="w-full p-2">
                    <Image
                      key={idx}
                      src={elem.largeImageURL}
                      alt="image"
                      width={100}
                      height={100}
                      className="w-full"
                    />
                    <div className="w-full flex flex-wrap justify-start items-center gap-2">
                      {elem.tags.split(",").map((tag: any, index: number) => (
                        <div key={index} className="bg-[#F5F5F5] p-2 rounded-md text-[#767676] text-xs md:text-sm">
                          {tag.trim()}{" "}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      )}
      {
        selectedObject && <IDetails obj={selectedObject} handleClose={handleClose}/>
      }
    </>
  );
};

export default Search;
