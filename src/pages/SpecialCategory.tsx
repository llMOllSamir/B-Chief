import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import useDish from '../hooks/useDish'

export default function SpecialCategory() {
    const { category } = useParams()
    const { data: specialCategories, isLoading, refetch } = useDish({ title: "Special Category", endPoint: `filter.php?c=${category}` })


    useEffect(() => {
        refetch()
    }, [category, refetch])

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Helmet>
                <title>{category}</title>
            </Helmet>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 my-10'>
                {
                    specialCategories?.data?.meals?.map((specialCategory: any) => (
                        <div className='flex flex-col justify-center shadow-2xl p-5 rounded-3xl items-center gap-5 w-2/3 sm:w-full mx-auto cursor-pointer ' key={specialCategory.idMeal}>
                            <Link to={`/recipe/${specialCategory?.idMeal}`}>
                                <img src={specialCategory.strMealThumb} alt={specialCategory.strMeal} className='  w-full   hover:scale-105 transition-all  duration-500  rounded-2xl' />
                            </Link>
                            <h2 className='font-bold text-sky-800 text-base'>{specialCategory.strMeal.split(" ").splice(0, 3).join(" ")}</h2>
                        </div>
                    ))
                }
            </div></>
    )
}
