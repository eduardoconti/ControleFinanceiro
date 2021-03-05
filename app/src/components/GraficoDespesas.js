import React, { useEffect, useState } from "react";
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
import { getValorDespesasPorCategoria } from "../common/DepesaFuncoes";
import { Box } from "@material-ui/core";

export default function GraficoTest({ stateCheckedDespesas, stateTotais, stateAnoAtual,stateMesAtual }) {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    async function pegaDespesas() {
      let despesas = await getValorDespesasPorCategoria(stateCheckedDespesas, stateAnoAtual,stateMesAtual);
      setDespesas(despesas);
    }
    pegaDespesas();
  }, [stateCheckedDespesas, stateTotais, stateAnoAtual, stateMesAtual]);

  return (
    <Box className='Grafico'>

      <ResponsiveContainer>
        <BarChart
          data={despesas}
          margin={{
            top: 15,
            right: 30,
            left: -10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria">
            <Label
              value="Despesas x Categoria"
              offset={-5}
              position="insideBottom"
            />
          </XAxis>
          <YAxis type="number" domain={[0, 3000]} />
          <Tooltip />
          <Bar dataKey="valor" fill="DarkRed" maxBarSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
