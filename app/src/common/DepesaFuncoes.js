import API from "./Api";

const ENDPOINT = "despesas/";

export async function getDespesas(stateCheckedDespesas) {
  var res = new Array(0);
  if (
    (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) ||
    (!stateCheckedDespesas.checkedPago && !stateCheckedDespesas.checkedAberto)
  ) {
    res = await API.get(ENDPOINT);
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(ENDPOINT + "pago");
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "aberto");
  }

  return res.data;
}

export async function getValorDespesasPorCategoria(stateCheckedDespesas) {
  var res = new Array(0);
  if (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "categoria/valor");
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(ENDPOINT + "categoria/valor/pago");
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(ENDPOINT + "categoria/valor/aberto");
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

export async function retornaTotalDespesas() {
  const total = await API.get(ENDPOINT + "total/");

  return total.data;
}

export async function retornaTotalDespesasPagas() {
  const total = await API.get(ENDPOINT + "pago/valor");
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export async function retornaTotalDespesasAbertas() {
  const total = await API.get(ENDPOINT + "aberto/valor");
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
      };
    });
  }

