import React from "react";

import CorpoCategorias from "./CorpoCategorias";
import CorpoDespesas from "./CorpoDespesas";
import CorpoReceitas from "./CorpoReceitas";
import CorpoCarteiras from "./CorpoCarteiras";
import CorpoSaldo from "./CorpoSaldo";
import CorpoTransferencias from "./CorpoTransferencias";
import * as Constants from "../common/Constantes";

import Alert from "./Alert";
export default function CurrentBody({
  stateCurrentBody,
  stateCheckedDespesas,
  setStateTotais,
  stateCheckedReceitas,
  stateTotais,
  stateMesAtual,
  stateAnoAtual,
}) {
  if (stateCurrentBody === Constants.CORPO_DESPESAS) {
    return (
      <CorpoDespesas
        stateCheckedDespesas={stateCheckedDespesas}
        setStateTotais={(stateTotais) => {
          setStateTotais(stateTotais);
        }}
        stateCheckedReceitas={stateCheckedReceitas}
        stateTotais={stateTotais}
        stateMesAtual={stateMesAtual}
        stateAnoAtual={stateAnoAtual}
      />
    );
  } else if (stateCurrentBody === Constants.CORPO_RECEITAS) {
    return (
      <CorpoReceitas
        stateCheckedDespesas={stateCheckedDespesas}
        setStateTotais={(stateTotais) => {
          setStateTotais(stateTotais);
        }}
        stateCheckedReceitas={stateCheckedReceitas}
        stateTotais={stateTotais}
        stateMesAtual={stateMesAtual}
        stateAnoAtual={stateAnoAtual}
      />
    );
  } else if (stateCurrentBody === Constants.CORPO_CATEGORIAS) {
    return <CorpoCategorias />;
  } else if (stateCurrentBody === Constants.CORPO_CARTEIRAS) {
    return <CorpoCarteiras />;
  } else if (stateCurrentBody === Constants.CORPO_SALDO) {
    return (
      <CorpoSaldo stateMesAtual={stateMesAtual} stateAnoAtual={stateAnoAtual} />
    );
  } else if (stateCurrentBody === Constants.CORPO_TRANSFERENCIAS) {
    return (
      <CorpoTransferencias
        stateMesAtual={stateMesAtual}
        stateAnoAtual={stateAnoAtual}
      ></CorpoTransferencias>
    );
  } else if (stateCurrentBody === Constants.CORPO_BALANCO) {
    return (
      <Alert
        alert={{
          isOpen: true,
          title: "Alerta",
          type: "warning",
          message: "Em Desenvolvimento",
        }}
        setAlert={() => {}}
      />
    );
  }
}
