import React from "react"

import GridDespesas from './DataGridDespesas'
import GridReceitas from './DataGridReceitas'
import FormularioDespesas from './FormDespesas'
import FormularioReceitas from './FormReceitas'
import FormularioCategorias from './FormCategorias'

const DATA_GRID_DESPESAS = 0;
const DATA_GRID_RECEITAS = 1;
const FORMULARIO_DESPESAS = 2;
const FORMULARIO_RECEITAS = 3;
const FORMULARIO_CATEGORIAS = 4;

export default function corp({
    stateCurrentBody,
    stateCheckedDespesas,
    setStateTotais,
    stateCheckedReceitas }) {

    console.log( stateCurrentBody )

    if (stateCurrentBody === DATA_GRID_DESPESAS ) {
        return ( <GridDespesas
            stateCheckedDespesas={stateCheckedDespesas}
            setStateTotais={(stateTotais) => { setStateTotais(stateTotais) }}
            stateCheckedReceitas={stateCheckedReceitas} /> )

    } else if (stateCurrentBody === DATA_GRID_RECEITAS ) {
       return ( <GridReceitas
            stateCheckedReceitas={stateCheckedReceitas}
            setStateTotais={(stateTotais) => { setStateTotais(stateTotais) }}
            stateCheckedDespesas={stateCheckedDespesas} /> )
    } else if (stateCurrentBody === FORMULARIO_DESPESAS ) {
        return ( <FormularioDespesas
            setStateTotais={(stateTotais) => { setStateTotais(stateTotais) }}
            stateCheckedDespesas={stateCheckedDespesas}
            stateCheckedReceitas={stateCheckedReceitas} /> )

    } else if (stateCurrentBody === FORMULARIO_RECEITAS ) {
        return ( <FormularioReceitas
            setStateTotais={(stateTotais) => { setStateTotais(stateTotais) }}
            stateCheckedDespesas={stateCheckedDespesas}
            stateCheckedReceitas={stateCheckedReceitas} /> )
    } else if (stateCurrentBody === FORMULARIO_CATEGORIAS) {
       return ( <FormularioCategorias></FormularioCategorias> )
    } else if (stateCurrentBody === 5) {

    }

}