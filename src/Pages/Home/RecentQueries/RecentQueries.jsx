import { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import SingleQuery from './SingleQuery';

const RecentQueries = ({ loadedItems }) => {
    const [recentQueries, setRecentQueries] = useState(loadedItems);
    const [showAll, setShowAll] = useState(false);
    const firstSixQueries = recentQueries.slice(0, 6);
    
    useEffect(() => {
        Aos.init();
    }, [recentQueries]);

    const handleShowAll = () => {
        setShowAll(true);
    };

    return (
        <div className='mb-5'>
            <h1 className='text-center text-3xl font-bold mt-5 mb-5'>Recent Queries</h1>
            {recentQueries.length === 0 ? (
                <p className='text-center text-red-400 font-bold'>No data found.</p>
            ) : (
                <div
                    data-aos='fade-zoom-in'
                    data-aos-offset='200'
                    data-aos-easing='ease-in-sine'
                    data-aos-duration='500'
                    className='w-[98%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                >
                    {showAll ? (
                        recentQueries?.map((recentQueriesItem) => (
                            <SingleQuery key={recentQueriesItem?._id} recentQueriesItem={recentQueriesItem} setRecentQueries={setRecentQueries}></SingleQuery>
                        ))
                    ) : (
                        firstSixQueries?.map((recentQueriesItem) => (
                            <SingleQuery key={recentQueriesItem?._id} recentQueriesItem={recentQueriesItem} setRecentQueries={setRecentQueries}></SingleQuery>
                        ))
                    )}
                </div>
            )}
            {/* Show All button */}
            {recentQueries?.length > 6 && !showAll && (
                <div className="text-center mt-8">
                   <Link to={`/allArt&Craft`}>
                   <Button onClick={handleShowAll} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Show All
                    </Button>
                   </Link>
                </div>
            )}
        </div>
    );
};

export default RecentQueries;
