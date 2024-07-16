import { Link } from "react-router-dom";
import useRandomDish from "../hooks/useRandomDish";

export default function RandomDish() {
  const { data, isError, isLoading, error } = useRandomDish();

  if (isLoading) {
    return <Loading />;
  }

  if(isError){
    return <Loading />;
  }

  return (
    <section className="container mx-auto px-2 py-10">
      {data?.data?.meals.map((dish: any) => (
        <div key={dish?.idMeal} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
          <img
            src={dish?.strMealThumb}
            width={400}
            className="aspect-square rounded-3xl mx-auto my-auto shadow-lg shadow-sky-800"
            alt={dish?.strMeal}
          />
          <div className="flex flex-col gap-5">
            <h2 className="text-sky-800 font-bold text-3xl">{dish?.strMeal}</h2>
            <p>
              {dish?.strInstructions.split("").splice(0, 1000).join("")}
              <Link
                className="text-sky-800 font-bold block"
                to={`/recipe/${dish?.idMeal}`}
              >
                Read More ......
              </Link>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

const Loading = () => {
  return (
    <section className="container mx-auto px-2 min-h-72 flex justify-center items-center">
      <p className="w-20 aspect-square rounded-full animate-spin border-b-2 border-t-2 border-sky-800"></p>
    </section>
  );
};
