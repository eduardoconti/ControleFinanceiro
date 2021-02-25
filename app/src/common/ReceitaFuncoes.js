import API from "./Api";

const ENDPOINT = "receitas/";


export async function getReceitas(stateCheckedReceitas, stateMesAtual) {
  var res = new Array(0);
  console.log(stateMesAtual)
  if (
    (stateCheckedReceitas.checkedPago && stateCheckedReceitas.checkedAberto) ||
    (!stateCheckedReceitas.checkedPago && !stateCheckedReceitas.checkedAberto)
  ) {
    res = await API.get(ENDPOINT + "mes/" + stateMesAtual );
  } else if (stateCheckedReceitas.checkedPago) {
    res = await API.get(ENDPOINT + "pago/mes/" + stateMesAtual );
  } else if (stateCheckedReceitas.checkedAberto) {
    res = await API.get(ENDPOINT + "aberto/mes/" + stateMesAtual );
  }

  return res.data;
}

export async function deletaReceita(id) {
  const res = await API.delete(ENDPOINT + id);
  return res.status.valueOf();
}

export async function insereReceita(receita) {
  const res = await API.post(ENDPOINT, receita);
  return res.status.valueOf();
}
export async function alteraReceita(receita) {
  const res = await API.put(ENDPOINT + receita.id, receita);
  return res.status.valueOf();
}
export async function alteraFlagPago(receita) {
  const res = await API.patch(ENDPOINT + "flag/" + receita.id, receita);
  return res.status.valueOf();
}
export async function retornaTotalReceitas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "total/mes/" + stateMesAtual);

  return total.data;
}

export async function retornaTotalReceitasPagas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "pago/valor/mes/" + stateMesAtual);
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export async function retornaTotalReceitasAbertas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "aberto/valor/mes/" + stateMesAtual);
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export function formataDadosParaLinhasDataGrid(receita) {
  return receita.map((despesa) => {
    return {
      ...despesa,
      carteira: despesa.carteira.descricao,
    };
  });
}

export function formataDadosParaFormulario(receita) {
  return receita.map((despesa) => {
    return {
      ...despesa,
      carteira: despesa.carteira.id,
    };
  });
}


