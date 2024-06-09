import React from 'react'
import { Chart } from "react-google-charts";

const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

const lineData = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

const options = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const AdminHome = () => {
  return (
    <div className='flex items-center'> 
    <Chart
    chartType="PieChart"
    data={data}

    width={"100%"}
    height={"400px"}
  />
     <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={lineData}
      options={options}
    />
  </div>
  )
}

export default AdminHome