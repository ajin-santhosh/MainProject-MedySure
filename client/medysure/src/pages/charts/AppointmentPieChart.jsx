import { Cell, Pie, PieChart } from "recharts";

const api_url = import.meta.env.VITE_API_URL;

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

export default function AppointmentPieChart({
  isAnimationActive = true,
  items = [],
}) {
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
        data={items}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="total"
        isAnimationActive={isAnimationActive}
      >
        {items.map((entry, index) => (
          <Cell
            key={`cell-${entry._id}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
