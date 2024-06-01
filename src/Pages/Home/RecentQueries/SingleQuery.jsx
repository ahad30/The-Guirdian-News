import 'animate.css';
import PropTypes from 'prop-types'
import moment from 'moment';


const SingleQuery = ({recentQueriesItem}) => {
console.log(recentQueriesItem)
const { image,brandName, itemName, queryTitle ,shortDescription, posterInfo,deadline } = recentQueriesItem
  return (

    <div className=''>
   <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <img className="object-cover w-full h-64" src={image} alt="Product"/>

    <div className="p-6">
        <div>
       <div className='flex justify-between'>
       <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{itemName}</p>
       <p className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
       #{brandName}</p>
       </div>
            <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"  role="link">{queryTitle}</a>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            
            {shortDescription}
            </p>
        </div>

        <div className="mt-4">
            <div className="flex items-center">
                <div className="flex items-center">
                    <img className="object-cover h-10 rounded-full" src={posterInfo?.photo} alt="Avatar"/>
                  <div>
                  <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" role="link">{posterInfo?.userName}</a>
                    <p className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                    {moment(deadline).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                  </div>
                </div>
               
            </div>
        </div>
    </div>
</div>
    </div>

  )
}


SingleQuery.propTypes = {
  recentQueriesItem: PropTypes.object.isRequired
}

export default SingleQuery;