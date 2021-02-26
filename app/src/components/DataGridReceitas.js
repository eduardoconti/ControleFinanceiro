import React, { useState, useEffect } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import {
  getReceitas,
  deletaReceita,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario
} from "../common/ReceitaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { calculaTotais } from "../common/Funcoes";
import { emptyAlertState } from '../common/EmptyStates'
import Alert from './Alert'
import { Box } from "@material-ui/core";
import { retornaStateAlertAlteracaoFlagPago, retornaStateAlertExclusao } from "../common/AlertFuncoes";

const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 4,
  },
});

export default function DataGridComponent({
  stateCheckedReceitas,
  setStateTotais,
  stateCheckedDespesas,
  stateTotais,
  setFormulario,
  stateMesAtual
}) {
  const [rows, setRows] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const classes = useStyles();
  const [alert, setAlert] = useState(emptyAlertState)
  const columns = [
    { field: "descricao", headerName: "Descricao", width: 150 },

    {
      field: "carteira",
      headerName: "Carteira",
      width: 120,
    },
    {
      field: "valor",
      headerName: "Valor",
      type: "number",
      width: 100,
    },

    {
      field: "operacoes",
      headerName: "Operacoes",
      width: 120,
      sortable: false,
      renderCell: function operacoes(field) {
        let cor;
        field.row.pago ? (cor = "green") : (cor = "DarkRed");
        return (
          <div>
            <IconButton
              aria-label="alterar"
              className={classes.operacoes}
              onClick={() => {
                const [formulario] = receitas.filter(
                  (receita) => receita.id === field.row.id
                );
                setFormulario(formulario);
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              className={classes.operacoes}
              onClick={async () => {
                let response = await deletaReceita(field.row.id);
                await setState();
                setStateTotais(
                  await calculaTotais(
                    stateCheckedDespesas,
                    stateCheckedReceitas,
                    stateMesAtual
                  )
                );
                setAlert( retornaStateAlertExclusao(response, 'Receita'))
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="pago"
              className={classes.operacoes}
              style={{ color: cor }}
              onClick={async () => {
                let receita = {
                  id: field.row.id,
                  pago: !field.row.pago,
                };
                let response = await alteraFlagPago(receita);
                await setState();
                setStateTotais(
                  await calculaTotais(
                    stateCheckedDespesas,
                    stateCheckedReceitas,
                    stateMesAtual
                  )
                )
                setAlert(retornaStateAlertAlteracaoFlagPago(response, receita.pago, 'Receita' ));
              }}
            >
              <FiberManualRecordTwoToneIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  async function setState() {

    let receitas = await getReceitas(stateCheckedReceitas, stateMesAtual);
    setRows(formataDadosParaLinhasDataGrid(receitas));
    setReceitas(formataDadosParaFormulario(receitas))
  }

  useEffect(() => {
    async function pegaReceitas() {
      let receitas = await getReceitas(stateCheckedReceitas, stateMesAtual);
      setRows(formataDadosParaLinhasDataGrid(receitas));
      setReceitas(formataDadosParaFormulario(receitas))
    }
    pegaReceitas();
  }, [stateCheckedReceitas, stateTotais, stateMesAtual]);

  return (
    <Box>
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} ></Alert>
      <DataGrid rows={rows} columns={columns} />
    </Box>

  );
}
