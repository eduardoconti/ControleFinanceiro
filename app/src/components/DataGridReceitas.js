import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import IconButton from '@material-ui/core/IconButton';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { getReceitas, deletaReceita, alteraFlagPago } from "../common/ReceitaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { calculaSaldo } from '../common/Funcoes'
const useStyles = makeStyles({
  operacoes: {
    color: '#216260',
    padding: 4

  }

});
export default function DataGridComponent({ stateCheckedReceitas, setStateTotais, stateTotais }) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

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
              onClick={async () => {
                await deletaReceita(field.row.id)
                await pegaReceitas();
                setStateTotais({ ...stateTotais, saldo: await calculaSaldo() })
              }}>
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton aria-label="pago"
              className={classes.operacoes}
              style={{ color: cor }}
              onClick={async () => {
                let receita = {
                  id: field.row.id,
                  pago: !field.row.pago
                }
                await alteraFlagPago(receita);
                await pegaReceitas();
                setStateTotais({ ...stateTotais, saldo: await calculaSaldo() })
              }}>
              <FiberManualRecordTwoToneIcon />
            </IconButton>

          </div>
        )
      },
    },
  ];

  async function pegaReceitas() {

    let receitas = await getReceitas(stateCheckedReceitas)
    setRows(receitas);

  }
  useEffect(() => {

    pegaReceitas();

  }, [stateCheckedReceitas]);

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
