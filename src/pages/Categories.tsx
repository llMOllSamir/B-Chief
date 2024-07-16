import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useDish from '../hooks/useDish'

export default function Categories() {
  const { category: searchCategory } = useParams()
  const [category, setCategory] = useState('')
  const { data: categories } = useDish({ endPoint: "categories.php", title: "categories" })
  const navigate = useNavigate()

  useEffect(() => {
    if (!searchCategory && categories?.data?.categories[0]?.strCategory) {
      navigate(`/categories/${categories?.data?.categories[0]?.strCategory}`);
    }
    if (searchCategory) {
      setCategory(searchCategory)
    }
  }, [categories, navigate, searchCategory])


  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <section className="container mx-auto px-2 min-h-[70vh] pt-24  pb-10 select-none">
        <h1 className="text-4xl font-bold text-white flex justify-center items-center mb-10">Select Category</h1>
        <label htmlFor="category" className='flex justify-center items-center flex-col   gap-5'>
          <select
            name="category"
            id="category"
            value={category}
            className="block w-1/2 lg:w-1/4 p-2.5 bg-gray-700 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setCategory(e.target.value)
              navigate(`/categories/${e.target.value}`)
            }}
          >
            {categories?.data?.categories.map((category: any) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </label>
        <Outlet />

      </section></>
  )
}
