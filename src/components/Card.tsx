import { useNavigate } from "react-router-dom";

type Props = {
  dish: Record<string, string>;
};
export default function Card({ dish }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer hover:scale-105 transition-all duration-500 flex flex-col justify-center items-center"
      onClick={() => navigate(`/recipe/${dish?.idMeal}`)}
    >
      <img
        className="w-3/4 rounded-lg shadow-xl sm:w-full  duration-500 transition-all"
        src={dish?.strMealThumb}
        alt={dish?.strMeal}
      />
      <h2 className="text-sky-800 font-bold text-base">
        {dish?.strMeal.split("").splice(0, 20).join("")}
      </h2>
    </div>
  );
}
