export const emptyFormularioDespesa = {
  descricao: "",
  categoria: 1,
  carteira: 1,
  valor: 0,
  pago: false,
  pagamento: new Date().toISOString().slice(0, 10),
  vencimento: new Date().toISOString().slice(0, 10),
};

export const emptyFormularioCategoria = {
  descricao: "",
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
