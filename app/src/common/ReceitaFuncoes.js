import API from "./Api";

const ENDPOINT = "receitas/";
const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export async function getReceitas(stateCheckedReceitas, stateMesAtual) {
  var res = new Array(0);
  if (
    (stateCheckedReceitas.checkedPago && stateCheckedReceitas.checkedAberto) ||
    (!stateCheckedReceitas.checkedPago && !stateCheckedReceitas.checkedAberto)
  ) {
    res = await API.get(ENDPOINT + "mes/" + stateMesAtual, headers);
  } else if (stateCheckedReceitas.checkedPago) {
    res = await API.get(ENDPOINT + "pago/mes/" + stateMesAtual, headers);
  } else if (stateCheckedReceitas.checkedAberto) {
    res = await API.get(ENDPOINT + "aberto/mes/" + stateMesAtual, headers);
  }

  return res.data;
}

export async function deletaReceita(id) {
  try {
    const res = await API.delete(ENDPOINT + id, headers);
    return res.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

export async function insereReceita(receita) {
  try {
    const res = await API.post(ENDPOINT, receita, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}
export async function alteraReceita(receita) {
  try {
    const res = await API.put(ENDPOINT + receita.id, receita, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}
export async function alteraFlagPago(receita) {
  try {
    const res = await API.patch(ENDPOINT + "flag/" + receita.id, receita, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}
export async function retornaTotalReceitas(stateMesAtual) {
  try {
    const total = await API.get(ENDPOINT + "total/mes/" + stateMesAtual, headers);
    return total.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

export async function retornaTotalReceitasPagas(stateMesAtual) {
  try {
    const total = await API.get(ENDPOINT + "pago/valor/mes/" + stateMesAtual, headers);
    if (!total.data) {
      return 0;
    }
    return total.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

export async function retornaTotalReceitasAbertas(stateMesAtual) {
  try {
    const total = await API.get(ENDPOINT + "aberto/valor/mes/" + stateMesAtual, headers);
    if (!total.data) {
      return 0;
    }
    return total.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

export async function retornaReceitasAgrupadasPorCarteira(stateMesAtual) {
  try {
    const total = await API.get(ENDPOINT + "carteira/mes/" + stateMesAtual, headers);
    return total.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
 
}

export function formataDadosParaLinhasDataGrid(receita) {
  return receita.map((receita) => {
    return {
      ...receita,
      carteira: receita.carteira.descricao,
      pagamento: new Date(receita.pagamento).toISOString().slice(0, 10),
    };
  });
}

export function formataDadosParaFormulario(receita) {
  return receita.map((receita) => {
    return {
      ...receita,
      carteira: receita.carteira.id,
      pagamento: new Date(receita.pagamento).toISOString().slice(0, 10)
    };
  });
}

