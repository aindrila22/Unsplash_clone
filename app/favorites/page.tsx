import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const DynamicFavoritePage = dynamic(
  () => import("../../components/Favorites"),
  {
    ssr: false,
  }
);

const UserFavourites = () => {
  return (
    <Background>
      <div className="flex-1 w-full flex flex-col md:gap-20 items-center pt-40 md:pt-0 md:px-14">
        <Navbar />
      </div>
      <DynamicFavoritePage />
    </Background>
  );
};

export default UserFavourites;
