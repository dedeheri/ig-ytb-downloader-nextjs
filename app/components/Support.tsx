import React from "react";

export default function Support() {
  return (
    <div className="shadow-lg bg-neutral-900 h-52 md:h-64 items-center w-full md:w-[45rem] rounded-xl flex justify-center mx-auto">
      <div className="space-y-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-medium text-purple-500 duration-300">
          Support Social Media
        </h1>

        <div className="flex items-center space-x-4">
          <img
            className="w-32 h-16 md:w-48 md:h-20"
            src={
              "https://www.pngkey.com/png/full/28-287308_instagram-logo-text-white.png"
            }
          />
          <img
            className="w-32 h-8 md:w-48 md:h-12"
            src={
              "https://freelogopng.com/images/all_img/1656504144youtube-logo-png-white.png"
            }
          />
        </div>
      </div>
    </div>
  );
}
