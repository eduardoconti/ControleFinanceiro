import React, { useState, useEffect } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import {
  getDespesas,
  deletaDespesa,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario
} from "../common/DepesaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { calculaTotais } from "../common/Funcoes";

const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 4,
  },
});



export default function DataGridDespesas({
  stateCheckedDespesas,
  setStateTotais,
  stateCheckedReceitas,
  stateTotais,
  setFormulario,
}) {
  const [rows, setRows] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const classes = useStyles();
  const columns = [
    { field: "descricao", headerName: "Descricao", width: 150 },
    {
      field: "categoria",
      headerName: "Categoria",
      width: 120,
    },
    {
      field: "carteira",
      headerName: "Carteira",
      width: 120,
    },
    {
      field: "vencimento",
      headerName: "Vencimento",
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
        return (
          <div>
            <IconButton
              aria-label="alterar"
              className={classes.operacoes}
              onClick={() => {
                console.log(despesas);
                const [formulario] = despesas.filter(
                  (despesa) => despesa.id === field.row.id
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
                await deletaDespesa(field.row.id);
                await pegaDespesas();

                setStateTotais(
                  await calculaTotais(
                    stateCheckedDespesas,
                    stateCheckedReceitas
                  )
                );
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="pago"
              className={classes.operacoes}
              style={{ color: field.row.pago ? "green" : "DarkRed" }}
              onClick={async () => {
                let despesa = {
                  id: field.row.id,
                  pago: !field.row.pago,
                };

                await alteraFlagPago(despesa);
                await pegaDespesas();
                setStateTotais(
                  await calculaTotais(
                    stateCheckedDespesas,
                    stateCheckedReceitas
                  )
                );
              }}
            >
              <FiberManualRecordTwoToneIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  async function pegaDespesas() {
    let despesas = await getDespesas(stateCheckedDespesas);
    setDespesas(formataDadosParaFormulario(despesas));
    setRows(formataDadosParaLinhasDataGrid(despesas));
  }

  useEffect(() => {
    pegaDespesas();
  }, [stateCheckedDespesas, stateTotais]);

  return <DataGrid rows={rows} columns={columns} />;
}
