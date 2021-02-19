import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import IconButton from '@material-ui/core/IconButton';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { getReceitas, deletaReceita, alteraReceita } from "../common/ReceitaFuncoes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  operacoes: {
    color: '#216260',
    padding: 4

  }

});
export default function DataGridComponent({ setTotalReceitas, stateCheckedReceitas }) {
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
                deletaReceita(field.row.id)
                setTotalReceitas()
              }}>
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton aria-label="pago"
              className={classes.operacoes}
              style={{ color: cor }}
              onClick={() => {
                let receita = field.row
                receita.pago = !receita.pago
                alteraReceita(receita);
                setTotalReceitas();

              }}>
              <FiberManualRecordTwoToneIcon />
            </IconButton>

          </div>
        )
      },
    },
  ];

  useEffect(() => {

    async function pegaReceita() {

      let receitas = await getReceitas(stateCheckedReceitas)

      setRows( receitas );    

    }

    pegaReceita();

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
