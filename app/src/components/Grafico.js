import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
export default function Grafico({ data, chaveX, chaveY, descricao, cor }) {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: -10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chaveX}>
          <Label value={descricao} offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis type="number" domain={[0, 3000]} />
        <Tooltip />
        <Bar dataKey={chaveY} fill={cor} maxBarSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}
