import API from "./Api";

const ENDPOINT = "categorias/";

async function retornaCategorias() {
  const res = await API.get(ENDPOINT);
  return res.data;
}

async function insereCategoria(categoria) {
  const res = await API.post(ENDPOINT, categoria);
  return res.status.valueOf();
}

async function deletaCategoria(id) {
  const res = await API.delete(ENDPOINT + id);
  return res.status.valueOf();
}
export { retornaCategorias, insereCategoria, deletaCategoria };
