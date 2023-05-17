import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { Ring } from "@uiball/loaders";
import fileDownload from "js-file-download";
import { redirect } from "next/navigation";

interface VideoInterface {
  thumbnail: string;
  title: string;
  format: any;
  url: string;
  selectedFormat: any;
  setSelectedFormat: any;
}

function Download({
  thumbnail,
  url,
  setSelectedFormat,
  selectedFormat,
  title,
  format,
}: VideoInterface) {
  const [fetching, setFetching] = useState<boolean>(false);

  async function download() {
    try {
      setFetching(true);

      const res = await axios.post("http://localhost:3000/api/download", {
        url,
        itag: selectedFormat?.itag,
        responseType: "blob",
      });
      setFetching(false);
      window.location.href = res.data.result.url;
    } catch (error: any) {
      setFetching(false);
      console.log(error);
    }
  }

  return (
    <div className=" border-neutral-800 border-2 rounded-xl h-36 md:h-40 w-full md:w-[45rem] px-4 md:px-6 mx-auto flex">
      <div className="flex space-x-5 items-center">
        <img src={thumbnail} alt={title} className="rounded-xl w-44 h-28" />

        <div className="space-y-4 md:space-y-3 ">
          {/* mobile */}
          <h1 className="text-white font-medium text-md md:text-lg leading-6 block md:hidden ">
            {title.length > 35 ? title.substring(0, 35) + "..." : title}
          </h1>
          {/* md */}
          <h1 className="text-white font-medium text-lg leading-6 md:block hidden">
            {title.length > 90 ? title.substring(0, 90) + "..." : title}
          </h1>

          {/* dropdown */}
          <div className="flex">
            {fetching ? (
              <button className="text-white w-28 md:w-32 h-9 md:h-10  px-4 rounded-l-xl bg-purple-900 text-sm md:text-md flex justify-center items-center">
                <Ring size={19} lineWeight={7} speed={2} color="white" />
              </button>
            ) : (
              <button
                onClick={download}
                className="text-white h-9 truncate md:h-10 w-20 md:w-32  px-4 rounded-l-xl bg-purple-900 text-sm md:text-md"
              >
                Download
              </button>
            )}

            <Listbox value={selectedFormat} onChange={setSelectedFormat}>
              <div className="relative">
                <Listbox.Button className="relative  rounded-r-xl border-purple-900 border text-white h-9 md:h-10 cursor-pointer flex items-center duration-200 px-2 w-24 md:w-28 justify-center hover:bg-neutral-800 ">
                  <span className="block text-sm truncate md:text-md">
                    {selectedFormat?.itag === 0
                      ? format[0]?.qualityLabel
                      : selectedFormat?.qualityLabel}
                  </span>
                  <FiChevronDown size={25} />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-black text-white border-purple-900 border">
                    {format?.map((format: any, i: number) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          `relative cursor-pointer select-none px-3 py-1 ${
                            active ? "bg-neutral-800 text-white" : "text-white"
                          }`
                        }
                        value={format}
                      >
                        <h1 className={`block truncate `}>
                          {format?.qualityLabel}
                        </h1>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;
