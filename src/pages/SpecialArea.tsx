import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";

export default function SpecialArea() {
  const { area } = useParams();
  const { data, refetch, isLoading, isError } = useDish({
    endPoint: `filter.php?a=${area}`,
    title: "Special Area"
  });
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [area, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <section className="container mx-auto px-2 min-h-[70vh] pt-24  pb-10">
        <h1 className="text-4xl font-bold text-red-900 flex justify-center items-center mb-10">
          Error...
        </h1>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{area}</title>
      </Helmet>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 my-10">
        {data?.data?.meals?.map((meal: any) => (
          <div
            key={meal.idMeal}
            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
            className="flex flex-col justify-center shadow-2xl p-5 rounded-3xl items-center gap-5 w-2/3 sm:w-full mx-auto cursor-pointer"
          >
            <img
              className="w-full   hover:scale-105 transition-all  duration-500  rounded-2xl"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
            <h2 className="text-sky-800 font-bold text-xl">{meal.strMeal}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
