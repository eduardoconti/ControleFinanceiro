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
import { getReceitas } from "../common/ReceitaFuncoes";
import { Box } from "@material-ui/core";

export default function GraficoReceitas({ stateCheckedReceitas, stateTotais, stateAnoAtual, stateMesAtual }) {

  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    async function pegaReceitas() {
      let receitas = await getReceitas(stateCheckedReceitas, stateAnoAtual,stateMesAtual);
      setReceitas(receitas);
    }
    pegaReceitas();
  }, [stateCheckedReceitas, stateTotais, stateAnoAtual,stateMesAtual]);

  return (
    <Box className='Grafico'>
      <ResponsiveContainer>
        <BarChart
          data={receitas}
          margin={{
            top: 15,
            right: 30,
            left: -10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="descricao">
            <Label value="Receitas" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis domain={[0, 4000]} />
          <Tooltip />
          <Bar dataKey="valor" fill="green" maxBarSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
