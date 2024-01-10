"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
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
      }
    };

    fetchImage();
  }, []);
  return (
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
  );
};

export default Background;
