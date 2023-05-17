import React from "react";
import Navbar from "./Navbar";

interface ContainerInterface {
  children: React.ReactNode;
}

function Container({ children }: ContainerInterface) {
  return (
    <div className="bg-black h-screen w-full min-h-screen mx-auto ">
      <Navbar />
      <div className="space-y-16 md:space-y-24 lg:space-y-28 duration-300 py-20 mx-5 ">
        {children}
      </div>
    </div>
  );
}

export default Container;
