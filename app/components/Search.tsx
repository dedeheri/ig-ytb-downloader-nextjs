import React from "react";

import { Ring } from "@uiball/loaders";

interface SearchInterface {
  onSubmit: React.FormEventHandler;
  setUrl: (events: string) => void;
  fetching: boolean;
  url: string;
}

export default function Search({
  onSubmit,
  url,
  setUrl,
  fetching,
}: SearchInterface) {
  return (
    <div
      className={`shadow-lg bg-neutral-900 h-32 md:h-40 items-center w-full md:w-[45rem] px-6 md:px-9 mx-auto border-2 flex justify-center rounded-xl ${
        url ? "border-purple-800" : "border-neutral-800"
      }`}
    >
      <form
        onSubmit={onSubmit}
        className="bg-neutral-800 w-full h-14 md:h-[4.5rem] flex items-center rounded-xl px-5 "
      >
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          name="search"
          id="search"
          className="text-xl focus:ring-0 rounded-full w-full border-0 bg-transparent autofill:bg-red-400 text-neutral-200 placeholder:text-gray-400 placeholder:text-md"
          placeholder="Paste your video link here"
        />

        {fetching ? (
          <button className="h-10 md:h-12 w-32 md:w-40 px-4  bg-purple-900 hover:bg-purple-800 duration-300 text-white font-medium rounded-xl flex items-center justify-center">
            <Ring size={22} lineWeight={7} speed={2} color="white" />
          </button>
        ) : (
          <button className="h-10 md:h-12 w-32 md:w-40 px-4  bg-purple-900 hover:bg-purple-800 duration-300 text-white font-medium rounded-xl">
            Download
          </button>
        )}
      </form>
    </div>
  );
}
