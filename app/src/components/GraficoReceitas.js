import React, { useEffect, useState } from "react";
import Grafico from "./Grafico";
import Radio from "./RadioButton";
import {
  getReceitas,
  retornaReceitasAgrupadasPorCarteiraChecked,
} from "../common/ReceitaFuncoes";
import { Box } from "@material-ui/core";

export default function GraficoReceitas({
  stateCheckedReceitas,
  stateTotais,
  stateAnoAtual,
  stateMesAtual,
}) {
  const [receitas, setReceitas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  useEffect(() => {
    async function pegaReceitas() {
      let receitas;

      if (stateGrafico === "1") {
        receitas = await getReceitas(
          stateCheckedReceitas,
          stateAnoAtual,
          stateMesAtual
        );
        setDescricao("Receitas");
      } else if (stateGrafico === "2") {
        receitas = await retornaReceitasAgrupadasPorCarteiraChecked(
          stateCheckedReceitas,
          stateAnoAtual,
          stateMesAtual
        );
        setDescricao("Receitas por Carteira");
      }
      setReceitas(receitas);
    }
    pegaReceitas();
  }, [
    stateCheckedReceitas,
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
        cor="green"
      />
      <Grafico
        data={receitas}
        chaveX="descricao"
        chaveY="valor"
        descricao={descricao}
        cor="green"
      />
    </Box>
  );
}
