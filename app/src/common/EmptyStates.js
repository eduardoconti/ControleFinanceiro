export function emptyFormularioDespesa(ano, mes) {
  return{
  descricao: "",
  categoria: "",
  carteira: "",
  valor: 0,
  pago: false,
  pagamento: new Date(ano+'-'+mes+'-10').toISOString().slice(0, 10),
  vencimento: new Date(ano+'-'+mes+'-10').toISOString().slice(0, 10),
  id: 0,
}};

export const emptyFormularioCategoria = {
  descricao: "",
  id: 0,
};

export const emptyFormularioCarteira = {
  descricao: "",
  id: 0,
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

export function emptyFormularioReceita(ano,mes){

return {
  descricao: "",
  carteira: "",
  valor: 0,
  pago: false,
  pagamento: new Date(ano+'-'+mes+'-10').toISOString().slice(0, 10),
  id: 0,
}};

export const emptyAlertState = {
  isOpen: false,
  message: "",
  type: "",
  title: "",
};

export function emptyFormularioTransferencia(ano,mes){

  return {
  id: 0,
  carteiraOrigem: "",
  carteiraDestino: "",
  valor: 0,
  pago: false,
  dataTransferencia: new Date(ano+'-'+mes+'-10').toISOString().slice(0, 10),
  }
};
