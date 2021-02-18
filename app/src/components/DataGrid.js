import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { getDespesas } from "../common/DepesaFuncoes";

export default function DataGridComponent({ }) {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
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
      width: 110,
      sortable: false,
      renderCell: () => (
        <strong>
          <IconButton aria-label="alterar"
            style={{ color: '#216260' }}
            onClick={() => { }}>
            <CreateTwoToneIcon />
          </IconButton>

          <IconButton aria-label="alterar"
            style={{ color: '#216260' }}
            onClick={() => { }}>
            <DeleteForeverTwoToneIcon />
          </IconButton>
        </strong>
      ),
    },
  ];

  useEffect(() => {
    getDespesas()
      .then((despesas) => {
        setRows(despesas);
      })
      .catch((error) => {
        console.error("Erro ao retornar despesas", error.message);
      });
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
      onRowSelected={(selectedRow) => setSelectedRow(selectedRow.data)}
    />

  );
}
