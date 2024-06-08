import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsFillGridFill } from "react-icons/bs";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import usePublisher from '../../hooks/usePublisher';

const AllArticles = () => {
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [allArticles, setAllArticles] = useState([]);
  const [publisher] = usePublisher();
  const axiosPublic = useAxiosPublic()
  const [publisherFilter, setPublisherFilter] = useState('')
// console.log(publisher)

  useEffect(() => {

    axiosPublic.get(`/allArticles`)
      .then(res => {
        console.log(res.data)
        setAllArticles(res.data)
      })
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    setSearch(searchText)
    axiosPublic.get(`/articleSearch?search=${searchText ? searchText : ""}&publisherFilter=${publisherFilter}`)
    .then((data) => {
      console.log(data.data)
      setAllArticles(data?.data?.result);
    })
  }
  const filteredArticles = allArticles.filter(article => article.status === 'Approved');
  // console.log(search)

  return (
    <section className='max-w-6xl mx-auto'>
      <h1 className='text-center font-bold text-xl mb-3'>All Articles</h1>
      <div className='flex flex-col gap-4 lg:flex-row justify-center'>
      <div className='flex justify-center lg:block lg:justify-start'>
            <select
              onChange={e => {
                setPublisherFilter(e.target.value)
              }}
              value={publisherFilter}
              name='publisher'
              id='publisher'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Publisher</option>
              {publisher.map((item, index) => (
              <option key={index} value={item.publisherName}>
              {item?.publisherName}
            </option>
        ))}
            </select>
    </div>
      <div>
      <form onSubmit={handleSearch} className='mb-10'>
            <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 w-[90%] lg:w-[90%] mx-auto focus-within:ring-blue-300'>
              <input
                className='px-6 py-3 text-gray-700  bg-white outline-none focus:placeholder-transparent w-[100%]'
                type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Enter Article Title'
                aria-label='Enter Article Title'
              />

              <button className='px-1 md:px-4 py-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
    </form>
    </div>
    </div>      
        <>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {
            filteredArticles?.length === 0 && 
                    <div>
                     <p className='flex justify-center text-red-400 font-bold'>
                     No data found.
                     </p>
                    </div>
                  } 
            {
              filteredArticles.map(item =>
                <div className='' key={item?._id}>
                  <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-64" src={item?.image} alt="Product" />

                    <div className="p-6">
                      <div>
                          <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{item?.title}</p>
                        <div className='flex justify-between'>
                        <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 mt-3">
                        {item?.publisher?.label}</p>
                        <p className="text-xs font-medium text-green-600 uppercase dark:text-blue-400 mt-3">
                        #{item?.tags?.label}</p>
                        </div>
                        
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">

                          {item?.description}
                        </p>
                      </div>

                      <div className="mt-4">

                        {/* <div className="flex items-center">
                          <img className="object-cover h-10 rounded-full" src={item?.posterInfo?.photo} alt="Avatar" />
                          <div>
                            <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" role="link">{item?.posterInfo?.userName}</a>
                           
                          </div>
                        </div> */}
                        <div className='flex justify-between items-center mt-4'>
                          <div>
                            <p className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                              {moment(item?.deadline).format('MMMM Do YYYY, h:mm:ss a')}
                            </p>
                          </div>
                          <Link to={`/articleDetails/${item?._id}`}>
                            <button
                            disabled={item?.isPremium === 'Yes' && item?.user.subscription === null}
                             className='text-sm bg-[#23BE0A] p-2 text-white rounded-md'> Details</button>
                          </Link>
                        </div>

                        <div>
                          {item?.isPremium === 'Yes' && <>
                            <div>Article is Premium</div>
                          </>}
                        </div>


                      </div>
                    </div>
                  </div>
                </div>)
            }
          </div>
        </>
    </section>
  )
}

export default AllArticles;