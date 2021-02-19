import API from "./Api"

const ENDPOINT = "receitas/"

async function getReceitas(stateCheckedReceitas) {
 
    var res = new Array(0)
    if( stateCheckedReceitas.checkedPago && stateCheckedReceitas.checkedAberto || !stateCheckedReceitas.checkedPago && !stateCheckedReceitas.checkedAberto){
       res = await API.get(ENDPOINT);
    }else if ( stateCheckedReceitas.checkedPago ){
        res = await API.get(ENDPOINT + 'pago')
    }else if ( stateCheckedReceitas.checkedAberto ){
        res = await API.get(ENDPOINT + 'aberto')
    }

    return res.data;
}

async function deletaReceita(id) {
    const res = await API.delete(ENDPOINT + id)
    return res.status.valueOf();
}

async function insereReceita(receita) {

    const res = await API.post(ENDPOINT, receita)
    return res.status.valueOf();
}
async function alteraReceita(receita) {

    const res = await API.put(ENDPOINT + receita.id, receita)
    return res.status.valueOf();
}

async function retornaTotalReceitas() {
    const total = await API.get(ENDPOINT + 'total/');

    return total.data
}

async function retornaTotalReceitasPagas() {
    const total = await API.get(ENDPOINT + 'pago/valor');
    if (!total.data) {
        return 0
    }
    return total.data
}

async function retornaTotalReceitasAbertas() {
    const total = await API.get(ENDPOINT + 'aberto/valor');
    if (!total.data) {
        return 0
    }
    return total.data
}
export {
    getReceitas,
    deletaReceita,
    insereReceita,
    alteraReceita,
    retornaTotalReceitas,
    retornaTotalReceitasPagas,
    retornaTotalReceitasAbertas
}