import API from "./Api";

const ENDPOINT = "carteiras/";

export async function retornaCarteiras() {
  const res = await API.get(ENDPOINT);
  return res.data;
}
export async function insereCarteira(carteira) {
  const res = await API.post(ENDPOINT, carteira);
  return res.status.valueOf();
}

export async function deletaCarteira(id) {
  const res = await API.delete(ENDPOINT + id);
  return res.status.valueOf();
}

export async function alteraCarteira(carteira) {
  const res = await API.put(ENDPOINT + carteira.id, carteira);
  return res.status.valueOf();
}

