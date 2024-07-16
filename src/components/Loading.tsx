import React from "react";

export default function Loading() {
  return (
    <section className="container mx-auto px-2 min-h-[70vh] flex justify-center items-center ">
      <h1 className="text-center flex flex-col justify-center items-center gap-5  ">
        <p className="w-28  aspect-square rounded-full animate-spin border-b-4  border-t-4  border-sky-900  top-1/2 left-1/2"></p>
        <strong className="text-sky-900 font-bold">Loading....</strong>
      </h1>
    </section>
  );
}
