import React from 'react';
import { Pie, PieChart,ResponsiveContainer  } from 'recharts';
import { Tooltip } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools'; // optional

const data = [
  { name: 'Normal', value: 65, fill: '#00C49F' },
  { name: 'Pre-Diabetic', value: 25, fill: '#FFBB28' },
  { name: 'High', value: 10, fill: '#FF8042' },
];
const renderLabel = ({ name, value, percent }) => {
  return `${name}: ${value}%`;
};
function SugarChart({ isAnimationActive = true }) {
  return (
 <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          paddingAngle={5}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}%`}
        />
      </PieChart>
    </ResponsiveContainer>
      )
}

export default SugarChart