import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from "react";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;


// #endregion
const PatientChart = () => {

    const [res, setRes] = useState([]);
  useEffect(() => {
  const fetchStatus = async () => {
    try {
      const result = await axios.get(
        `${api_url}/dashboard/patientWeekReport`,
        { withCredentials: true }
      );

      console.log("STATUS DATA:", result.data.data);  // logs only once

      setRes(result.data.data);
    } catch (error) {
      console.error("Error in API calls for patient week status:", error);
    }
  };

  fetchStatus();
}, []);
  return (
    <ComposedChart
      style={{ width: '100%', maxWidth: '600px', maxHeight: '50vh', aspectRatio: 1.618 }}
      responsive
      data={res}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="_id" scale="band" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="count" stroke="#ff7300" />
    </ComposedChart>
  );
};

export default PatientChart;