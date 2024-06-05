import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePublisher = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: publisher = [] } = useQuery({
        queryKey: ['publisher'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/publishers`);
            return res.data;
        }
    })

    return [publisher, refetch]
};

export default usePublisher;