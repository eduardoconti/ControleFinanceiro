import API from "./Api";

const ENDPOINT = "carteiras/";
const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export async function retornaCarteiras() {
  try {
    const res = await API.get(ENDPOINT, headers);
    return res.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

export async function insereCarteira(carteira) {
  try {
    const res = await API.post(ENDPOINT, carteira, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

export async function deletaCarteira(id) {
  try {
    const res = await API.delete(ENDPOINT + id, headers);
    return res.data;
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

export async function alteraCarteira(carteira) {
  try {
    const res = await API.put(ENDPOINT + carteira.id, carteira, headers);
    return res.status.valueOf();
  } catch (error) {
    console.log(error)
    return error.response.status
  }
}

