import {
  retornaTotalDespesasPagas,
  retornaTotalDespesasAbertas,
} from "./DepesaFuncoes";
import {
  retornaTotalReceitasPagas,
  retornaTotalReceitasAbertas,
} from "./ReceitaFuncoes";

async function calculaTotais(stateCheckedDespesas, stateCheckedReceitas, stateAnoAtual, stateMesAtual) {
  let totalDespesas, totalDespesasPagas, totalDespesasAbertas;
  let totalReceitas, totalReceitasPagas, totalReceitasAbertas;

  totalDespesas = 0;
  totalDespesasPagas = await retornaTotalDespesasPagas(stateAnoAtual,stateMesAtual);
  totalDespesasAbertas = await retornaTotalDespesasAbertas(stateAnoAtual,stateMesAtual);

  stateCheckedDespesas.checkedPago
    ? (totalDespesas += totalDespesasPagas)
    : (totalDespesas += 0);
  stateCheckedDespesas.checkedAberto
    ? (totalDespesas += totalDespesasAbertas)
    : (totalDespesas += 0);

  totalReceitas = 0;
  totalReceitasPagas = await retornaTotalReceitasPagas(stateAnoAtual,stateMesAtual);
  totalReceitasAbertas = await retornaTotalReceitasAbertas(stateAnoAtual,stateMesAtual);

  stateCheckedReceitas.checkedPago
    ? (totalReceitas += totalReceitasPagas)
    : (totalReceitas += 0);
  stateCheckedReceitas.checkedAberto
    ? (totalReceitas += totalReceitasAbertas)
    : (totalReceitas += 0);

  return {
    totalDespesas: totalDespesas,
    totalReceitas: totalReceitas,
    saldo: totalReceitasPagas - totalDespesasPagas,
    balanco:
      totalReceitasAbertas +
      totalReceitasPagas -
      (totalDespesasPagas + totalDespesasAbertas),
  };
}

export { calculaTotais };
