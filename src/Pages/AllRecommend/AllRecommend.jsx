import moment from 'moment';

const AllRecommend = ({recommended}) => {
// const id = useParams();
// const [recommendData , setRecommendData] =  useState([])
console.log(recommended);


  return (
    <div className='space-y-11'>
      {recommended?.map(ahad=> 
        <div key={ahad?._id}>
          
      
        <div className="w-full lg:w-[50%]  px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row items-center justify-between">

          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            {moment(ahad.deadline).format('MMMM Do YYYY, h:mm:ss a')}
          </span>
          <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">{ahad.recommendProductName}</a>
        </div>

        <div className="mt-2">
         
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {ahad.recommendReason}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between mt-4">
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabindex="0" role="link">{ahad.itemName}</a>

          <div className="flex items-center gap-2">
            <img src={ahad?.photo} alt="avatar" className='object-cover h-10 rounded-full' />
            <div>
              <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">{ahad?.userName}</a>
              <p className='text-sm'>{ahad?.userEmail}</p>
            </div>
          </div>
        </div>
      </div>
      
          
        </div>
      )}
    </div>
  )
}

export default AllRecommend