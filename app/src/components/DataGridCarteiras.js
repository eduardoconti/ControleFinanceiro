import React, { useState, useEffect } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { retornaCarteiras, deletaCarteira } from "../common/CarteiraFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 4,
  },
});

export default function DataGridCarteiras({rows, setRows, setFormulario }) {

  const classes = useStyles();
  const columns = [
    { field: "descricao", headerName: "Descricao", width: 150 },
    {
      field: "operacoes",
      headerName: "Operacoes",
      width: 120,
      sortable: false,
      renderCell: function operacoes(field) {
        return (
          <Box>
            <IconButton
              aria-label="alterar"
              className={classes.operacoes}
              onClick={() => {
                setFormulario(field.row);
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              className={classes.operacoes}
              onClick={async () => {
                await deletaCarteira(field.row.id);
                await pegaCarteiras();
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  async function pegaCarteiras() {
    let ccarteiras = await retornaCarteiras();
    setRows(ccarteiras);
  }

  useEffect(() => {
    pegaCarteiras();
  }, []);

  return <DataGrid rows={rows} columns={columns} />;
}
