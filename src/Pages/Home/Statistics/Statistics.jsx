import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import CountUp from 'react-countup';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Statistics = () => {
    const [user, setUser] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(() => {

        axiosPublic.get(`/users`)
          .then(res => {
            console.log(res.data)
            setUser(res.data)
          })
      }, [])
      const premiumUser = user.filter(item => item.subscription === "Yes");
    console.log(premiumUser)
  return (
    <section className="bg-white">
    <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Can see How many user in our website
        </h2>

      </div>
  
      <div className="mt-8 sm:mt-12">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">Total Users</dt>
  
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            <CountUp duration={10} end={user.length}/></dd>
          </div>
  
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">Normal User</dt>
  
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              <CountUp duration={10} end={user.length}/></dd>
          </div>
  
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">Premium User</dt>
  
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            
              
                    <>
                    <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                    <CountUp duration={10} end={premiumUser?.length}/></dd> 
                    </>
                
            
            
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
  )
}

export default Statistics