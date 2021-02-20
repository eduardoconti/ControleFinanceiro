import API from "./Api"

const ENDPOINT = "despesas/"

function returnRows(despesas) {

    return despesas.map((despesa) => {
        return {...despesa, categoria: despesa.categoria.descricao}
    });
}

async function getDespesas(stateCheckedDespesas) {
 
    var res = new Array(0)
    if( stateCheckedDespesas.checkedPago && stateCheckedDespesas.checkedAberto || !stateCheckedDespesas.checkedPago && !stateCheckedDespesas.checkedAberto){
       res = await API.get(ENDPOINT );
    }else if ( stateCheckedDespesas.checkedPago ){
        res = await API.get(ENDPOINT + 'pago')
    }else if ( stateCheckedDespesas.checkedAberto ){
        res = await API.get(ENDPOINT + 'aberto')
    }

    return returnRows(res.data);
} 

async function deletaDespesa(id) {
    const res = await API.delete(ENDPOINT + id)
    return res.status.valueOf();
}

async function insereDespesa(despesa) {

    const res = await API.post(ENDPOINT, despesa)
    return res.status.valueOf();
}
async function alteraFlagPago(despesa) {

    const res = await API.patch(ENDPOINT +'flag/' + despesa.id, despesa)
    console.log( res )
    return res.status.valueOf();
}

async function retornaTotalDespesas() {
    const total = await API.get(ENDPOINT + 'total/');

    return total.data
}

async function retornaTotalDespesasPagas() {
    const total = await API.get(ENDPOINT + 'pago/valor');
    if (!total.data) {
        return 0
    }
    return total.data
}

async function retornaTotalDespesasAbertas() {
    const total = await API.get(ENDPOINT + 'aberto/valor');
    if (!total.data) {
        return 0
    }
    return total.data
}
export {
    getDespesas,
    deletaDespesa,
    insereDespesa,
    alteraFlagPago,
    retornaTotalDespesas,
    retornaTotalDespesasPagas,
    retornaTotalDespesasAbertas
}