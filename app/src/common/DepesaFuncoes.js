import API from "./Api";

const ENDPOINT = "despesas/";
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
export async function getDespesas(
  stateCheckedDespesas,
  stateAnoAtual,
  stateMesAtual
) {
  var res = new Array(0);

  if (
    (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) ||
    (!stateCheckedDespesas.checkedPago && !stateCheckedDespesas.checkedAberto)
  ) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual,
      headers
    );
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=true",
      headers
    );
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=false",
      headers
    );
  }

  return res.data;
}

export async function getValorDespesasPorCategoria(
  stateCheckedDespesas,
  stateAnoAtual,
  stateMesAtual
) {
  var res = new Array(0);
  if (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/categoria/valor/",
      headers
    );
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/categoria/valor/?pago=true",
      headers
    );
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/categoria/valor/?pago=false",
      headers
    );
  }

  return res.data;
}

export async function getValorDespesasPorCarteira(
  stateCheckedDespesas,
  stateAnoAtual,
  stateMesAtual
) {
  var res = new Array(0);
  if (stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/carteira/valor/",
      headers
    );
  } else if (stateCheckedDespesas.checkedPago) {
    res = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/carteira/valor/?pago=true",
      headers
    );
  } else if (stateCheckedDespesas.checkedAberto) {
    res = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/carteira/valor/?pago=false",
      headers
    );
  }

  return res.data;
}

export async function deletaDespesa(id) {
  try {
    const res = await API.delete(ENDPOINT + id, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Deletado Despesa",
    };
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function insereDespesa(despesa) {
  try {
    const res = await API.post(ENDPOINT, despesa, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Inserido Despesa",
    };
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function alteraFlagPago(despesa) {
  try {
    const res = await API.patch(
      ENDPOINT + "flag/" + despesa.id,
      despesa,
      headers
    );
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Alterado Flag Pago",
    };
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function alteraDespesa(despesa) {
  try {
    const res = await API.put(ENDPOINT + despesa.id, despesa, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Alterado Despesa",
    };
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function retornaTotalDespesas(stateAnoAtual, stateMesAtual) {
  try {
    const total = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total",
      headers
    );
    return total.data;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}

export async function retornaTotalGeralDespesasPagas() {
  try {
    const total = await API.get(ENDPOINT + "total/?pago=true", headers);
    return total.data;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}

export async function retornaDespesasAgrupadasPorCarteira(
  stateAnoAtual,
  stateMesAtual,
  pago
) {
  try {
    const total = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/carteira/valor/?pago=" +
        pago,
      headers
    );
    return total.data;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}

export async function retornaTotalDespesasPagas(stateAnoAtual, stateMesAtual) {
  const total = await API.get(
    ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=true",
    headers
  );
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export async function retornaTotalDespesasAbertas(
  stateAnoAtual,
  stateMesAtual
) {
  const total = await API.get(
    ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=false",
    headers
  );
  if (!total.data) {
    return 0;
  }
  return total.data;
}

export async function retornaDespesaPorId(id) {
  try {
    const total = await API.get(
      ENDPOINT + 'id/' + id,
      headers
    );
    return total.data;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
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

export function formataDadosParaFormulario(despesa) {
    return {
      ...despesa,
      categoria: despesa.categoria.id,
      carteira: despesa.carteira.id,
      vencimento: new Date(despesa.vencimento).toISOString().slice(0, 10),
    };
}
