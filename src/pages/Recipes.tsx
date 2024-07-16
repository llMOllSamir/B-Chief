import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { FaYoutube } from "react-icons/fa";
import useDish from "../hooks/useDish";
import Modal from "../components/Modal";
import VideoDisplay from "../components/VideoDisplay";

export default function Recipes() {
  const { id } = useParams();
  const { getIngredient, getIngredientPic } = useContext(ApiContext);
  const { data, isLoading, isError, refetch } = useDish({ title: "dish by id", endPoint: `lookup.php?i=${id}` });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [show, setShow] = useState(false);


  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{data?.data?.meals[0]?.strMeal}</title>
      </Helmet>
      <section className="container mx-auto px-4 min-h-[70vh] flex justify-start items-center py-28 ">
        {data?.data?.meals?.map((dish: any) => (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 "
            key={dish?.idMeal}
          >
            <div className="flex flex-col justify-start items-center gap-10">
              <img
                className="w-3/4 md:w-1/2 lg:w-3/4 max-w-lg rounded-3xl shadow-2xl shadow-sky-900 mx-auto"
                src={dish?.strMealThumb}
                alt={dish?.strMeal}
              />
              <div className="flex justify-center items-center gap-5">
                {dish?.strSource && (
                  <Link
                    className="text-white px-5 py-2 bg-orange-600 rounded-full "
                    to={dish?.strSource}
                    target="_blank"
                  >
                    Source
                  </Link>
                )}
                {dish?.strYoutube && (
                  <button
                    className="text-white px-5 py-2 bg-red-600  rounded-full flex justify-center items-center gap-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaYoutube />
                    YouTube
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-sky-800 font-bold text-3xl">
                {dish?.strMeal}
              </h1>
              <div className="text-sky-800 flex justify-center items-start w-full pe-10 font-bold flex-col  text-lg">
                <h2>
                  Area :
                  <Link
                    className="text-orange-800"
                    to={`/area/${dish?.strArea}`}
                  >
                    {" " + dish?.strArea}
                  </Link>
                </h2>
                <h2>
                  Category :
                  <Link
                    className="text-orange-800"
                    to={`/categories/${dish?.strCategory}`}
                  >
                    {" " + dish?.strCategory}
                  </Link>
                </h2>
              </div>

              <p>
                {!show
                  ? dish?.strInstructions.split("").splice(0, 500).join("")
                  : dish?.strInstructions}{" "}
                <span
                  onClick={() => setShow(!show)}
                  className="text-sky-800 cursor-pointer"
                >
                  {show ? "Show less ....." : "..... Show more"}
                </span>
              </p>
              <h2 className="text-sky-800 font-bold text-xl">Ingredients</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-5 ">
                {getIngredient(dish).map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center  "
                  >
                    <img
                      src={getIngredientPic(ingredient[1])}
                      alt={ingredient[1]}
                      className="w-full drop-shadow-2xl"
                    />
                    <p>{ingredient[0]}</p>
                    <p>{ingredient[1]}</p>
                  </div>
                ))}
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <VideoDisplay videoUrl={dish?.strYoutube} />
            </Modal>
          </div>
        ))}
      </section>
    </>
  );
}
