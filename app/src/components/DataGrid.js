import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import IconButton from '@material-ui/core/IconButton';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { getDespesas, deletaDespesa, alteraFlagPago } from "../common/DepesaFuncoes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  operacoes: {
    color: '#216260',
    padding: 4

  }

});
export default function DataGridComponent({ setTotalDespesas, stateCheckedDespesas }) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 50,
    },
    { field: "descricao", headerName: "Descricao", width: 150 },
    {
      field: "categoria",
      headerName: "Categoria",
      width: 120,
    },
    {
      field: "carteira",
      headerName: "Carteira",
      type: "number",
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
        let cor
        field.row.pago ? cor = 'green' : cor = 'DarkRed'
        return (
          <div>
            <IconButton aria-label="alterar"
              className={classes.operacoes}
              onClick={() => { }}>
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton aria-label="excluir"
              className={classes.operacoes}
              onClick={() => {
                deletaDespesa(field.row.id)
                setTotalDespesas()
              }}>
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton aria-label="pago"
              className={classes.operacoes}
              style={{ color: cor }}
              onClick={() => {
                let despesa = {
                  id: field.row.id,
                  pago: !field.row.pago
                }

                alteraFlagPago(despesa);
                setTotalDespesas();

              }}>
              <FiberManualRecordTwoToneIcon />
            </IconButton>

          </div>
        )
      },
    },
  ];

  useEffect(() => {

    async function pegaDespesa() {

      let despesas = await getDespesas(stateCheckedDespesas)

      setRows(despesas);

    }

    pegaDespesa();

  });

  return (

    <DataGrid
      rows={rows}
      columns={columns}
      rowHeight={30}
      hideFooterSelectedRowCount
      hideFooterRowCount
      disableColumnMenu
      hideFooter
      hideFooterPagination

    />

  );
}
