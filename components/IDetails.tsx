import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "../assets/close.svg";
import check from "../assets/checked.svg";
import ncheck from "../assets/notcheck.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "@/redux/slice/favorites";
import { RootState } from "@/redux/store";

export interface FavoriteItem {
  id: string;
}

const IDetails = ({ obj, handleClose }: any) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/favorite");
        if (response.ok) {
          const data = await response.json();
          dispatch(fetchFavorites(data.favorites));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      setIsFavorite(favorites.some((item) => item === obj.elem.largeImageURL));
    }
  }, [favorites, obj.elem.id]);

  const changeFavoritesHandler = async (id: any) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchFavorites(data.data));
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full md:min-h-screen h-full overflow-y-scroll md:py-8 bg-white lg:bg-black lg:bg-opacity-50 flex items-center justify-center">
      <div className="bg-white max-w-6xl w-full overflow-y-scroll rounded-md py-20 md:py-0">
        <div className="bg-[#F5F5F5] h-14 w-full rounded-tl-md rounded-tr-md flex justify-between items-center px-6">
          <div>Preview ID: {obj.elem.id}</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <Image src={close} alt="" width={24} height={24} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row  justify-start items-start w-full px-4 lg:px-8 pt-9">
          <div className="md:w-2/3 lg:h-[535px] w-full object-contain">
            <Image
              src={obj.elem.largeImageURL}
              alt="selected-image"
              width={200}
              height={200}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="px-10 py-2 md:w-1/3 max-w-sm w-full mx-auto lg:mx-0">
            <div>Download</div>
            <table className="w-full border border-gray-200 rounded-lg my-4 text-sm">
              <tbody className="w-full">
                <tr
                  key={1}
                  className="py-2 hover:bg-gray-200 border border-gray-200"
                >
                  <td className="p-3">Small</td>
                  <td className="p-3">640x960</td>
                  <td className="">
                    <Image src={ncheck} alt="" width={20} height={20} />
                  </td>
                </tr>
                <tr
                  key={2}
                  className="py-2 hover:bg-gray-200 border border-gray-200"
                >
                  <td className="p-3">Large</td>
                  <td className="p-3">1920x2660</td>
                  <td>
                    <Image src={ncheck} alt="" width={20} height={20} />
                  </td>
                </tr>
                <tr
                  key={3}
                  className="py-2 hover:bg-gray-200 border border-gray-200"
                >
                  <td className="p-3">Big</td>
                  <td className="p-3">2400x3600</td>
                  <td>
                    <Image src={ncheck} alt="" width={20} height={20} />
                  </td>
                </tr>
                <tr
                  key={4}
                  className="py-2 hover:bg-gray-200 border border-gray-200"
                >
                  <td className="p-3">Original</td>
                  <td className="p-3">
                    {obj.elem.imageWidth}x{obj.elem.imageHeight}
                  </td>
                  <td>
                    <Image src={check} alt="" width={20} height={20} />
                  </td>
                </tr>
              </tbody>
            </table>
            <a href={obj.elem.largeImageURL} download>
              <button className="w-full bg-[#4BC34B] text-white text-sm py-3 rounded-md">
                Download for free
              </button>
            </a>
            <div className="flex justify-center items-center w-full gap-2">
              <a href={obj.elem.largeImageURL} target="_blank">
                <button className="w-full mt-3 bg-slate-700 text-white text-sm py-2 px-4 rounded-md">
                  Share
                </button>
              </a>
              <button
                onClick={() => changeFavoritesHandler(obj.elem.largeImageURL)}
                className="w-full mt-3 bg-pink-700 text-white text-sm py-2 rounded-md px-2"
              >
                {isFavorite ? "Remove Favorites" : "Add to Favorites"}
              </button>
            </div>
            <div className="my-4">Information</div>
            <table className="w-full my-4 text-sm text-left">
            <tbody className="w-full">
              <tr key={1} className="text-[12px] tracking-wider capitalize">
                <td className="px-3">User</td>
                <td className="px-3">User-id</td>
                <td className="px-3">type</td>
              </tr>
              <tr key={2} className="text-[15px] capitalize mt-2 font-medium">
                <td className="px-3">{obj.elem.user}</td>
                <td className="px-3">{obj.elem.user_id}</td>
                <td className="px-3">{obj.elem.type}</td>
              </tr>
              </tbody>
            </table>
            <table className="w-full mt-8 text-sm text-left">
            <tbody className="w-full">
              <tr key={3} className="text-[12px] tracking-wider capitalize">
                <td className="px-3">Views</td>
                <td className="px-3">Downloads</td>
                <td className="px-3">Likes</td>
              </tr>
              <tr key={4} className="text-[15px] capitalize mt-2 font-medium">
                <td className="px-3">{obj.elem.views}</td>
                <td className="px-3">{obj.elem.downloads}</td>
                <td className="px-3">{obj.elem.likes}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-start items-center gap-2 lg:px-8 px-4 py-3">
          {obj.elem.tags.split(",").map((tag: any, index: number) => (
            <div
              key={index}
              className="bg-[#F5F5F5] p-2 rounded-md text-[#767676] text-xs md:text-sm"
            >
              {tag.trim()}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IDetails;
