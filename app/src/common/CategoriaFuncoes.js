import API from "./Api";

const ENDPOINT = "categorias/";

export async function retornaCategorias() {
  const res = await API.get(ENDPOINT);
  return res.data;
}

export async function insereCategoria(categoria) {
  const res = await API.post(ENDPOINT, categoria);
  return res.status.valueOf();
}

export async function deletaCategoria(id) {
  const res = await API.delete(ENDPOINT + id);
  return res.status.valueOf();
}

export async function alteraCategoria(carteira) {
  const res = await API.put(ENDPOINT + carteira.id, carteira);
  return res.status.valueOf();
}

