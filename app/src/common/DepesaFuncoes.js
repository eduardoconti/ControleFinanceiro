import API from "./Api";

const ENDPOINT = "despesas/";
const headers = { headers:{
  'Content-Type': 'application/json'
}}
export async function getDespesas(stateCheckedDespesas, stateMesAtual) {
  var res = new Array(0);

  if (
    (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) ||
    (!stateCheckedDespesas.checkedPago && !stateCheckedDespesas.checkedAberto)
  ) {
    res = await API.get(ENDPOINT + 'mes/' + stateMesAtual, headers);
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(ENDPOINT + "pago/mes/" + stateMesAtual, headers);
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "aberto/mes/" + stateMesAtual,headers);
  }

  return res.data;
}

export async function getValorDespesasPorCategoria(stateCheckedDespesas, stateMesAtual) {
  var res = new Array(0);
  if (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "categoria/mes/" + stateMesAtual, headers);
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(ENDPOINT + "categoria/pago/mes/" + stateMesAtual, headers);
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "categoria/aberto/mes/" + stateMesAtual, headers);
  }

  return res.data;
}

export async function deletaDespesa(id) {
  try {
    const res = await API.delete(ENDPOINT + id, headers);
    return res.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }

}

export async function insereDespesa(despesa) {
  try {
    const res = await API.post(ENDPOINT, despesa, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }

}

export async function alteraFlagPago(despesa) {
  try {
    const res = await API.patch(ENDPOINT + "flag/" + despesa.id, despesa, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }

}

export async function alteraDespesa(despesa) {
  try {
    const res = await API.put(ENDPOINT + despesa.id, despesa, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }
 
}

export async function retornaTotalDespesas(stateMesAtual) {
  try {
    const total = await API.get(ENDPOINT + "total/mes/" + stateMesAtual, headers);
    return total.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
 
}


export async function retornaDespesasAgrupadasPorCarteira(stateMesAtual) {
  try {
    const total = await API.get(ENDPOINT + "carteira/mes/" + stateMesAtual, headers);
    return total.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
 
}

export async function retornaTotalDespesasPagas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "pago/valor/mes/" + stateMesAtual, headers);
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export async function retornaTotalDespesasAbertas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "aberto/valor/mes/" + stateMesAtual, headers);
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export function formataDadosParaLinhasDataGrid(despesas) {
  return despesas.map((despesa) => {
    return {
      ...despesa,
      categoria: despesa.categoria.descricao,
      carteira: despesa.carteira.descricao,
      vencimento: new Date(despesa.vencimento).toISOString().slice(0, 10),
    };
  });
}

export function formataDadosParaFormulario(despesas) {
  return despesas.map((despesa) => {
    return {
      ...despesa,
      categoria: despesa.categoria.id,
      carteira: despesa.carteira.id,
      vencimento: new Date(despesa.vencimento).toISOString().slice(0, 10),
    };
  });
}

