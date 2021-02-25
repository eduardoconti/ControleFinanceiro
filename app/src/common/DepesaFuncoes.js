import API from "./Api";

const ENDPOINT = "despesas/";

export async function getDespesas(stateCheckedDespesas, stateMesAtual) {
  var res = new Array(0);

  if (
    (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) ||
    (!stateCheckedDespesas.checkedPago && !stateCheckedDespesas.checkedAberto)
  ) {
    res = await API.get(ENDPOINT + 'mes/' + stateMesAtual);
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(ENDPOINT + "pago/mes/" + stateMesAtual);
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "aberto/mes/" + stateMesAtual);
  }

  return res.data;
}

export async function getValorDespesasPorCategoria(stateCheckedDespesas, stateMesAtual) {
  var res = new Array(0);
  if (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "categoria/mes/" + stateMesAtual);
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(ENDPOINT + "categoria/pago/mes/" + stateMesAtual);
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "categoria/aberto/mes/" + stateMesAtual);
  }

  return res.data;
}

export async function deletaDespesa(id) {
  const res = await API.delete(ENDPOINT + id);
  return res.status.valueOf();
}

export async function insereDespesa(despesa) {
  const res = await API.post(ENDPOINT, despesa);
  return res.status.valueOf();
}

export async function alteraFlagPago(despesa) {
  const res = await API.patch(ENDPOINT + "flag/" + despesa.id, despesa);
  return res.status.valueOf();
}

export async function alteraDespesa(despesa) {
  const res = await API.put(ENDPOINT + despesa.id, despesa);
  return res.status.valueOf();
}

export async function retornaTotalDespesas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "total/mes/" + stateMesAtual);

  return total.data;
}

export async function retornaTotalDespesasPagas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "pago/valor/mes/" + stateMesAtual);
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export async function retornaTotalDespesasAbertas(stateMesAtual) {
  const total = await API.get(ENDPOINT + "aberto/valor/mes/" + stateMesAtual);
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

export function retornaStateAlert(codResponse, pago) {
  let descricaoAlert = ''
  let type = ''

  if (codResponse === 200) {
    descricaoAlert = 'Alterado despesa para ' + (pago ? 'Pago' : 'Aberto')
    type = 'success'
  }
  else {
    descricaoAlert = 'Falha ao alterar despesa '
    type = 'error'
  }

  return {
    isOpen: true,
    message: descricaoAlert,
    type: type
  }
}

export function retornaStateAlertExclusao(codResponse) {
  let descricaoAlert = ''
  let type = ''

  if (codResponse === 200) {
    descricaoAlert = 'Excluido Despesa'
    type = 'success'
  }
  else {
    descricaoAlert = 'Falha ao Excluir Despesa'
    type = 'error'
  }

  return {
    isOpen: true,
    message: descricaoAlert,
    type: type
  }
}

export function retornaStateAlertCadastro(codResponse) {
  let descricaoAlert = ''
  let type = ''

  if (codResponse === 200 || codResponse === 201 ) {
    
    descricaoAlert = ( codResponse === 201 ? 'Inserido' :'Alterado') + ' Despesa'
    type = 'success'
  }
  else {
    descricaoAlert = 'Falha ao Inserir Despesa'
    type = 'error'
  }

  return {
    isOpen: true,
    message: descricaoAlert,
    type: type
  }
}

