import { Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useDish from "../hooks/useDish";

export default function Area() {
  const navigate = useNavigate();
  const { area } = useParams()
  const [areaLabel, setArea] = useState('')
  const { data, isLoading, isError } = useDish({ endPoint: "list.php?a=list", title: "areas" });


  useEffect(() => {
    if (!area && data?.data?.meals[0]?.strArea) {
      navigate(`/area/${data?.data?.meals[0]?.strArea}`);
    }
    if (area) {
      setArea(area)
    }
  }, [data, navigate, area])


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
        <title>Area</title>
      </Helmet>
      <section className="container mx-auto px-2 min-h-[70vh] pt-24  pb-10 select-none">
        <h1 className="text-4xl font-bold text-white flex justify-center items-center mb-10">Select Area</h1>
        <label htmlFor="area" className='flex justify-center items-center flex-col  gap-5'>
          <select
            name="area"
            id="area"
            value={areaLabel}
            className="block w-1/2 lg:w-1/4 p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setArea(e.target.value)
              navigate(`/area/${e.target.value}`)
            }}
          >
            {data?.data?.meals.map((area: any, index: number) => (
              <option key={index} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </label>
        <Outlet />

      </section></>
  );
}
