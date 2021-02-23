import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getValorDespesasPorCategoria } from "../common/DepesaFuncoes";

export default function GraficoTest({ stateCheckedDespesas, stateTotais }) {
  const [despesas, setDespesas] = useState([]);


  async function pegaDespesas() {
    let despesas = await getValorDespesasPorCategoria(stateCheckedDespesas);
    setDespesas(despesas);

  }

  useEffect(() => {
    pegaDespesas();
  }, [stateCheckedDespesas, stateTotais]);


  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={despesas}
        margin={{
          top: 15,
          right: 30,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="categoria" />
        <YAxis type='number' domain={[0, 1500] } />
        <Tooltip />
        <Bar dataKey="valor" fill="DarkRed" maxBarSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}
