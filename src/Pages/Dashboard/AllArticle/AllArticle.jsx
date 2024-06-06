import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUser from '../../../hooks/useUser';

const AllArticle = () => {
  const axiosSecure = useAxiosSecure();
  const [users] = useUser();
  // console.log(users)
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allArticle');
            return res.data;
        }
    })
    console.log(articles)
  return (
    <div>AllArticle</div>
  )
}

export default AllArticle