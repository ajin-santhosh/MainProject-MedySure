import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from "react";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

// #region Sample data
// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// #endregion
const AppointmentWeekReport = () => {
    const [res, setRes] = useState([]);
  useEffect(() => {
  const fetchStatus = async () => {
    try {
      const result = await axios.get(
        `${api_url}/dashboard/appointmentWeekReport`,
        { withCredentials: true }
      );

      // console.log("STATUS DATA:", result.data.data);  // logs only once

      setRes(result.data.data);
    } catch (error) {
      console.error("Error in API calls for appointment status:", error);
    }
  };

  fetchStatus();
}, []);
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '500px', maxHeight: '30vh', aspectRatio: 1.618 }}
      responsive
      data={res}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#4dd7f3ff" activeBar={<Rectangle fill="yellow" stroke="blue" />} />
    </BarChart>
  );
};

export default AppointmentWeekReport;