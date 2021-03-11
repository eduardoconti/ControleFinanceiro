import React, { useEffect, useState } from "react";
import Radio from "./HeaderGraficos";
import {
  getValorDespesasPorCategoria,
  getValorDespesasPorCarteira,
} from "../common/DepesaFuncoes";
import { Box } from "@material-ui/core";
import Grafico from "./Grafico";

export default function GraficoTest({
  stateCheckedDespesas,
  stateTotais,
  stateAnoAtual,
  stateMesAtual,
}) {
  const [despesas, setDespesas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    async function pegaDespesas() {
      let despesas;

      if (stateGrafico === "1") {
        despesas = await getValorDespesasPorCategoria(
          stateCheckedDespesas,
          stateAnoAtual,
          stateMesAtual
        );
        setDescricao("Despesas por Categoria");
      } else if (stateGrafico === "2") {
        despesas = await getValorDespesasPorCarteira(
          stateCheckedDespesas,
          stateAnoAtual,
          stateMesAtual
        );
        setDescricao("Despesas por Carteira");
      }
      setDespesas(despesas);
    }
    pegaDespesas();
  }, [
    stateCheckedDespesas,
    stateTotais,
    stateAnoAtual,
    stateMesAtual,
    stateGrafico,
  ]);

  return (
    <Box className="Grafico">
      <Radio
        setStateGrafico={(stateGrafico) => {
          setStateGrafico(stateGrafico);
        }}
        cor="#E55451"
        descricao={descricao}
      />
      <Grafico
        data={despesas}
        chaveX="descricao"
        chaveY="valor"
        cor="#E55451"
        stroke="#F62217"
      />
    </Box>
  );
}
