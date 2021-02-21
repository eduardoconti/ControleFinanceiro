import API from "./Api"

const ENDPOINT = "categorias/"

async function retornaCategorias() {
    const res = await API.get(ENDPOINT);
    return res.data
}

export {
    retornaCategorias
}