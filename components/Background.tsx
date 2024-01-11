"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import BouncingLoader from "./Loader";

const Background = ({ children }: { children: React.ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY,
            q: "dark+mountains",
            image_type: "photo",
            orientation: "horizontal",
          },
        });

        const randomIndex = Math.floor(
          Math.random() * response.data.hits.length
        );
        const randomImage = response.data.hits[randomIndex];

        setBackgroundImage(randomImage.largeImageURL);
      } catch (error) {
        console.error("Error fetching image:", error);
        setBackgroundImage([bg1, bg2][Math.floor(Math.random() * 2)].src);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <>
      {loading && <BouncingLoader />}
      {!loading && (
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Background;
