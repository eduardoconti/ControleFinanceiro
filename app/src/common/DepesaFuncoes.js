import API from "./Api"

const ENDPOINT = "despesas/"

async function getDespesas() {
    const res = await API.get(ENDPOINT);
    return res.data;
}

async function deletaDespesa(id) {
    const res = await API.delete(ENDPOINT + id)
    return res.status.valueOf();
}

async function insereDespesa(despesa) {

    const res = await API.post(ENDPOINT, despesa)
    return res.status.valueOf();
}
async function alteraDespesa(despesa) {

    const res = await API.put(ENDPOINT + despesa.id, despesa)
    return res.status.valueOf();
}

async function retornaTotalDespesas() {
    const data = await getDespesas()
    let total = 0
    data.forEach(element => {
        total += element.valor
    });
    return total
}
export {
    getDespesas,
    deletaDespesa,
    insereDespesa,
    alteraDespesa,
    retornaTotalDespesas
}