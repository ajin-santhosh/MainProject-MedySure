import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AppointmentWeekReport = ({ items = [] }) => {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "50vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={items}
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
      <Bar
        dataKey="count"
        fill="#4dd7f3ff"
        activeBar={<Rectangle fill="yellow" stroke="blue" />}
      />
    </BarChart>
  );
};

export default AppointmentWeekReport;
