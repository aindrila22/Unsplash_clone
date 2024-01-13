"use client";

import { fetchFavorites } from "@/redux/slice/favorites";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import BouncingLoader from "./Loader";

const Favorites = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/favorite");
        if (response.ok) {
          const data = await response.json();
          dispatch(fetchFavorites(data));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const images = useSelector((state: RootState) => state.favorites);

  return (
    <div className="w-full max-w-6xl grid place-items-center mx-auto">
      {loading && (
        <div className="grid place-items-center w-full mx-auto">
          <BouncingLoader />
        </div>
      )}
      {images.length <= 0 && (
        <div className="grid place-items-center italic my-10 w-auto px-4 py-1 bg-white text-black mx-auto">
          No favorites till now
        </div>
      )}
      {images.length > 0 && (
        <div className="w-full block h-full p-6">
          {!loading && images && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
            >
              <Masonry gutter="4">
                {images.map((elem, idx) => (
                  <a
                    href={elem}
                    target="_blank"
                    key={idx}
                    className="w-full p-2"
                  >
                    <Image
                      key={idx}
                      src={elem}
                      alt="image"
                      width={100}
                      height={100}
                      className="w-full"
                    />
                  </a>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
