import axios from "axios";
import { Cell, Pie, PieChart } from "recharts";
import { useState, useEffect } from "react";

// #region Sample data
// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
//   { name: "Group E", value: 200 },
// ];

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#e40000ff"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function AppointmentByPatientPieChart({ isAnimationActive = true,res }) {
    
   return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "300px",
        maxHeight: "60vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={res}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="total"
        isAnimationActive={isAnimationActive}
      >
        {res.map((entry, index) => (
          <Cell
            key={`cell-${entry._id}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
