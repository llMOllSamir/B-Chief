import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
 import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useDish from '../hooks/useDish';

export default function Ingredients() {
  const { data, isLoading, isError } = useDish({endPoint:"list.php?i=list",title:"ingredients"});
  const navigate = useNavigate();
  const { ingredient } = useParams()
  const [ingredientLabel, setIngredient] = useState('')


  useEffect(() => {
    if (!ingredient && data?.data?.meals[0]?.strIngredient) {
      navigate(`/ingredients/${data?.data?.meals[0]?.strIngredient}`);
    }
    if (ingredient) {
      setIngredient(ingredient)
    }
  }, [data, navigate, ingredient])


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
        <title>Ingredients</title>
      </Helmet>
      <section className="container mx-auto px-2 min-h-[70vh] pt-24  pb-10 select-none">
        <h1 className="text-4xl font-bold text-white flex justify-center items-center mb-10">Select an Ingredient</h1>
        <label htmlFor="area" className='flex justify-center items-center flex-col  gap-5'>
          <select
            name="area"
            id="area"
            value={ingredientLabel}
            className="block w-1/2 lg:w-1/4 p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setIngredient(e.target.value)
              navigate(`/ingredients/${e.target.value}`)
            }}
          >
            {data?.data?.meals.map((area: any, index: number) => (
              <option key={index} value={area.strIngredient}>
                {area.strIngredient}
              </option>
            ))}
          </select>
        </label>
        <Outlet />
      </section>
    </>
  );
}
