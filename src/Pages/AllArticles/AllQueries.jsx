import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import moment from 'moment';
import { BsFillGridFill } from "react-icons/bs";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllQueries = () => {
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [allQueries, setallQueries] = useState([]);
  const [layout, setLayout] = useState('3-column');
  const axiosPublic = useAxiosPublic()


  useEffect(() => {

    axiosPublic.get(`/allArticles`)
      .then(res => {
        console.log(res.data)
        setallQueries(res.data)
      })
  }, [sort])

  const handleSearch = e => {
    e.preventDefault()
    setSearch(searchText)
    axios.get(`${import.meta.env.VITE_API_URL}/products?search=${searchText ? searchText : ""}`).then((data) => {
      console.log(data.data)
      setallQueries(data?.data?.result);
    })
  }

  // console.log(search)

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };
  return (
    <section className='max-w-6xl mx-auto'>
      <h1 className='text-center font-bold text-xl mb-3'>All Queries</h1>


      <div className='flex justify-center items-center gap-3 mb-5'>
        <button onClick={() => handleLayoutChange('3-column')}><BsFillGrid3X2GapFill className='text-lg' /></button>
        <button onClick={() => handleLayoutChange('2-column')} ><BsFillGridFill /></button>
      </div>
      <form onSubmit={handleSearch} className='mb-10'>
            <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 w-[90%] lg:w-[40%] mx-auto focus-within:ring-blue-300'>
              <input
                className='px-6 py-3 text-gray-700  bg-white outline-none focus:placeholder-transparent w-[100%]'
                type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 md:px-4 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          


      {layout === '3-column' && (
        <>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {
              allQueries.map(item =>
                <div className='' key={item?._id}>
                  <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={item?.image} alt="Product" />

                    <div className="p-6">
                      <div>
                        <div className='flex justify-between'>
                          <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{item?.itemName}</p>
                          <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                            #{item?.brandName}</p>
                        </div>
                        <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" role="link">{item?.queryTitle}</a>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">

                          {item?.shortDescription}
                        </p>
                      </div>

                      <div className="mt-4">

                        <div className="flex items-center">
                          <img className="object-cover h-10 rounded-full" src={item?.posterInfo?.photo} alt="Avatar" />
                          <div>
                            <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" role="link">{item?.posterInfo?.userName}</a>
                            <p className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                              {moment(item?.deadline).format('MMMM Do YYYY, h:mm:ss a')}
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-between items-center mt-4'>
                          <div>
                            <p className='font-bold'>Comment: {item?.recommended.length}</p>
                          </div>
                          <Link to={`/queryDetails/${item?._id}`}>
                            <button className='text-sm bg-[#23BE0A] p-2 text-white rounded-md'> Recommend</button>
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>)
            }
          </div>
        </>
      )}


      {layout === '2-column' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {
            allQueries.map(item =>
              <div className='' key={item?._id}>
                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <img className="object-cover w-full h-64" src={item?.image} alt="Product" />

                  <div className="p-6">
                    <div>
                      <div className='flex justify-between'>
                        <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{item?.itemName}</p>
                        <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
                          #{item?.brandName}</p>
                      </div>
                      <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" role="link">{item?.queryTitle}</a>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">

                        {item?.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <img className="object-cover h-10 rounded-full" src={item?.posterInfo?.photo} alt="Avatar" />
                          <div>
                            <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" role="link">{item?.posterInfo?.userName}</a>
                            <p className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                              {moment(item?.deadline).format('MMMM Do YYYY, h:mm:ss a')}
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-between items-center mt-4'>
                          <div>
                            <p className='font-bold'>Comment: {item?.recommended.length}</p>
                          </div>
                          <Link to={`/queryDetails/${item?._id}`}>
                            <button className='text-sm bg-[#23BE0A] p-2 text-white rounded-md'> Recommend</button>
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>)
          }
        </div>
      )}

    </section>
  )
}

export default AllQueries;