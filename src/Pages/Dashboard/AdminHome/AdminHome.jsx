
import { Chart } from "react-google-charts";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'



const lineData = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

const lineOptions = {
  title: "Publisher article",
  curveType: "function",
  legend: { position: "bottom" },
};

const AdminHome = () => {
   const axiosSecure = useAxiosSecure()
  
  
  const { data: statData = [], isLoading } = useQuery({
    queryKey: ['statData'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/articles/countByPublisher')
      return data
    },
  })
  // console.log(statData)

  const chartData = [
    ["Publisher", "Number of Articles"],
    ...statData.map(item => [item.publisher, item.count])
  ];

  const options = {
    title: "Number of Articles by Publisher",
    is3D: true,
  };



  return (
    <div className='flex items-center'> 
    <Chart
    chartType="PieChart"
    data={chartData}
    width={"100%"}
    height={"400px"}
    options={options}
  />

     <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData}
      options={lineOptions}
    />
  </div>
  )
}

export default AdminHome;