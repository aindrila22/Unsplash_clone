import Image from "next/image";
import React from "react";

const IDetails = ({ url, handleClose }: any) => {


  return (
    <div  onClick={handleClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 max-w-5xl w-full h-full">
        <div>
          <div>
            <Image
              src={url}
              alt="selected-image"
              width={400}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Additional information or close button can be added here */}
      </div>
    </div>
  );
};

export default IDetails;
