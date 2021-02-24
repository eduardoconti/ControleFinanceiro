import React from "react";

import CorpoCategorias from "./CorpoCategorias";
import CorpoDespesas from "./CorpoDespesas";
import CorpoReceitas from "./CorpoReceitas";

import * as Constants from "../common/Constantes"

export default function CurrentBody({
  stateCurrentBody,
  stateCheckedDespesas,
  setStateTotais,
  stateCheckedReceitas,
  stateTotais,
}) {
  if (stateCurrentBody === Constants.DATA_GRID_DESPESAS) {
    return (
      <CorpoDespesas
        stateCheckedDespesas={stateCheckedDespesas}
        setStateTotais={(stateTotais) => {
          setStateTotais(stateTotais);
        }}
        stateCheckedReceitas={stateCheckedReceitas}
        stateTotais={stateTotais}
      />
    );
  } else if (stateCurrentBody === Constants.DATA_GRID_RECEITAS) {
    return (
      <CorpoReceitas
        stateCheckedDespesas={stateCheckedDespesas}
        setStateTotais={(stateTotais) => {
          setStateTotais(stateTotais);
        }}
        stateCheckedReceitas={stateCheckedReceitas}
        stateTotais={stateTotais}
      />
    );
  } else if (stateCurrentBody === Constants.DATA_GRID_CATEGORIAS) {
    return <CorpoCategorias />;
  } else if (stateCurrentBody === Constants.DATA_GRID_CARTEIRAS) {
  }
}
