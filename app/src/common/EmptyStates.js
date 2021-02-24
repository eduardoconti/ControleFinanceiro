export const emptyFormularioDespesa = {
  descricao: "",
  categoria: 1,
  carteira: 1,
  valor: 0,
  pago: false,
  pagamento: new Date().toISOString().slice(0, 10),
  vencimento: new Date().toISOString().slice(0, 10),
  id:0
};

export const emptyFormularioCategoria = {
  descricao: "",
  id: 0
};

export const emptyFormularioCarteira = {
  descricao: "",
  id: 0
};
export const emptyTotais = {
  totalDespesas: 0,
  totalReceitas: 0,
  saldo: 0,
  balanco: 0,
};

export const emptyChecked = {
  checkedPago: true,
  checkedAberto: true,
};

export const emptyFormularioReceita = {
  descricao: "",
  carteira: 1,
  valor: 0,
  pago: false,
  pagamento: new Date().toISOString().slice(0, 10),
};

