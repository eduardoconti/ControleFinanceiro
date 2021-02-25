import React, { useEffect } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { retornaCategorias, deletaCategoria } from "../common/CategoriaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 4,
  },
});

export default function DataGridCategorias({rows, setRows, setFormulario }) {

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
                await deletaCategoria(field.row.id);
                await pegaCategorias();
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  async function pegaCategorias() {
    let categorias = await retornaCategorias();
    setRows(categorias);
  }

  useEffect(() => {
    pegaCategorias();
  }, []);

  return <DataGrid rows={rows} columns={columns} />;
}
