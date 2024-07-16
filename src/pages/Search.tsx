import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Card from "../components/Card";
import Loading from "../components/Loading";
import useDish from "../hooks/useDish";

export default function Search() {
  const { term } = useParams();
  const [newTerm, setTerm] = useState(term);
  const { data, isLoading, isError, refetch } = useDish({
    endPoint: `search.php?s=${term}`,
    title: "search"
  });
  const navigate = useNavigate();
  let ref = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  // handle search query
  useEffect(() => {
    const x = setTimeout(() => {
      if (newTerm) {
        navigate("/search/" + newTerm);
        refetch();
      }
    }, 1000);
    return () => {
      clearTimeout(x);
    };
  }, [newTerm, navigate, refetch]);

  // handle load data success
  useEffect(() => {
    ref.current?.blur();
  }, [data]);

  // handle load data Loading
  if (isLoading) {
    return <Loading />;
  }
  // handle load data Error
  if (isError) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <section className="container mx-auto px-2 pt-24 ">
        <div
          className={`flex flex-col lg:flex-row justify-center items-center gap-x-10 gap-5`}
        >
          <h1 className="text-center flex flex-col justify-center items-center gap-5  text-3xl ">
            <strong className="text-sky-900 font-bold">
              Search for ({term})
            </strong>
          </h1>

          <input
            ref={ref}
            onFocus={(e) => (e.target.value = "")}
            type="search"
            className="w-4/12 border-0  lg:w-2/12 outline-0 px-3 py-1 rounded-xl shadow-lg transition-all duration-500 focus:w-6/12 lg:focus:w-3/12"
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 my-10">
          {data?.data?.meals && data?.data?.meals.length > 0 ? (
            data?.data?.meals?.map((dish: Record<string, string>) => (
              <Card dish={dish} key={dish?.idMeal} />
            ))
          ) : (
            <div className="flex justify-center items-center   h-96 flex-col gap-5 col-span-6">
              <h2 className="text-sky-800 font-bold text-3xl">
                No results found for {term}
              </h2>
              <h4 className="text-gray-600 font-bold text-xl flex justify-center gap-3  items-center">
                Try another search{" "}
                <CiSearch
                  onClick={() => {
                    ref.current?.focus();
                    setTerm("");
                  }}
                  className="text-sky-800 animate-pulse"
                  cursor={"pointer"}
                  size={"2rem"}
                />
              </h4>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
