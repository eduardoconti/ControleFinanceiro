import API from "./Api"

const ENDPOINT = "carteiras/"

async function retornaCarteiras() {
    const res = await API.get(ENDPOINT);
    return res.data
}

export {
    retornaCarteiras
}