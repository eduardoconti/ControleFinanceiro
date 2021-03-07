import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import CardSaldo from "./CardSaldoCarteira";
import { retornaReceitasAgrupadasPorCarteira } from "../common/ReceitaFuncoes";
import { retornaDespesasAgrupadasPorCarteira } from "../common/DepesaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";

async function RetornaCards(stateAnoAtual, stateMesAtual) {
  let object = await retornaDadosParaCard(stateAnoAtual, stateMesAtual);

  return object.map((obj, i) => {
    return (
      <Grid item xs={6} md={3} key={i}>
        <CardSaldo
          valor={obj.valor}
          descricao={obj.descricao}
          cor="#483d8b"
        ></CardSaldo>
      </Grid>
    );
  });
}

async function retornaDadosParaCard(stateAnoAtual, stateMesAtual) {
  const carteiras = await retornaCarteiras();
  const despesas = await retornaDespesasAgrupadasPorCarteira(
    stateAnoAtual,
    stateMesAtual,
    true
  );
  const receitas = await retornaReceitasAgrupadasPorCarteira(
    stateAnoAtual,
    stateMesAtual,
    true
  );
  const dadosCard = [];

  carteiras.forEach((carteira, i) => {
    let receita = receitas.find((receita) => receita.id === carteira.id);
    let despesa = despesas.find((despesa) => despesa.id === carteira.id);

    if (receita == null) {
      receita = { descricao: carteira.descricao, valor: 0 };
    }
    if (despesa == null) {
      despesa = { descricao: carteira.descricao, valor: 0 };
    }

    dadosCard.push({
      descricao: carteira.descricao,
      valor: receita.valor - despesa.valor,
    });
  });

  return await dadosCard;
}

export default function CorpoSaldo({ stateAnoAtual, stateMesAtual }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    RetornaCards(stateAnoAtual, stateMesAtual).then((cards) => {
      setCards(cards);
    });
  }, [stateMesAtual]);

  return (
    <Grid container direction="row" spacing={1}>
      {cards}
    </Grid>
  );
}
