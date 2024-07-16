import React from "react";
import logo from "../images/3145.jpg";
export default function NotFound() {
  return (
    <section
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className=" grow w-full min-h-[50vh] flex justify-center flex-col items-center gap-5"
    >
      <h2 className=" text-4xl text-white font-bold lg:text-7xl bg-black bg-opacity-50 p-10 shadow-lg">
        Oops... page not found
      </h2>
    </section>
  );
}
