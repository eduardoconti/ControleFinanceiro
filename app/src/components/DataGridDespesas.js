import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import IconButton from '@material-ui/core/IconButton';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import { getDespesas, deletaDespesa, alteraFlagPago } from "../common/DepesaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { calculaSaldo } from '../common/Funcoes'

const useStyles = makeStyles({
  operacoes: {
    color: '#216260',
    padding: 4
  }
});

export default function DataGridComponent({ stateCheckedDespesas, setStateTotais, stateTotais }) {
  const [rows, setRows] = useState([]);
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
            <IconButton aria-label="alterar"
              className={classes.operacoes}
              onClick={() => { }}>
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton aria-label="excluir"
              className={classes.operacoes}
              onClick={async () => {

                await deletaDespesa(field.row.id);
                await pegaDespesas();

                setStateTotais({ ...stateTotais, saldo: await calculaSaldo() })

              }}>
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton aria-label="pago"
              className={classes.operacoes}
              style={{ color: field.row.pago ? 'green' : 'DarkRed' }}
              onClick={async () => {

                let despesa = {
                  id: field.row.id,
                  pago: !field.row.pago
                }

                await alteraFlagPago(despesa);
                await pegaDespesas();
                setStateTotais({ ...stateTotais, saldo: await calculaSaldo() })

              }}>
              <FiberManualRecordTwoToneIcon />
            </IconButton>

          </div>
        )
      },
    },
  ];

  async function pegaDespesas() {
    let despesas = await getDespesas(stateCheckedDespesas)
    setRows(despesas);
  }

  useEffect(() => {

    pegaDespesas();

  }, [stateCheckedDespesas]);

  return (
    <div className="DataGrid">

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
    </div>

  );
}
