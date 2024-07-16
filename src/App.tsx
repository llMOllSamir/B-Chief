import "./App.css";
import { Helmet } from "react-helmet-async";
import RandomDish from "./components/RandomDish";
import { log } from "console";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    const x = setTimeout(() => {
      if (searchData && searchData.length > 0) {
        navigate(`/search/${searchData}`);
      }
    }, 1000);
    return () => {
      clearTimeout(x);
    };
  }, [searchData, navigate]);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="home select-none shadow-2xl">
        <div className="lg:px-20 px-8 hidden lg:block  ">
          <h1 className=" lg:first-letter:text-9xl first-letter:text-7xl  align-text-top  font-bold first-letter:text-sky-800">
            B
            <span className="text-3xl text-white relative -left-4 -top-4 lg:text-5xl lg:-top-7 lg:-left-7">
              Chief
            </span>
          </h1>
        </div>
        <div className="text-center text-xl lg:text-3xl font-bold text-white lg:bg-transparent bg-black bg-opacity-40 shadow-lg  w-fit mx-auto px-8 flex flex-col gap-5 font-serif   ">
          <h2>Welcome To Our Website</h2>
          <h3 className="xl:text-4xl ">Now you can search for your food</h3>
          <h3>Or check our recipes</h3>
        </div>
      </section>
      <section className="w-full text-center relative -top-6">
        <input
          onChange={handleChange}
          type="search"
          placeholder="Search for Recipes"
          className="w-9/12 lg:w-1/4 rounded-lg md:w-1/2 focus:w-3/4 lg:focus:w-2/6 transition-width duration-500
            outline-none border-none caret-orange-600  text-xl font-mono  font-bold text-gray-600
            bg-orange-300 shadow-md shadow-amber-300 mx-auto h-12 px-5 placeholder:text-gray-600"
        />
      </section>
      <RandomDish />
    </>
  );
}
