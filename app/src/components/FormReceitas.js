import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { insereReceita } from "../common/ReceitaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioReceita } from "../common/EmptyStates";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    flexWrap: "wrap",
    alignItems: 'center'
  },
  botao: {
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    margin: 5
  }
}));

function Menu(object) {
  return object.map((obj, i) => {
    return (
      <MenuItem key={i} value={obj.id}>
        {obj.descricao}
      </MenuItem>
    );
  });
}

export default function FormReceitas({
  stateCheckedDespesas,
  stateCheckedReceitas,
  setStateTotais,
  setFormulario,
  formulario,
  stateMesAtual
}) {
  const [carteiras, setCarteiras] = useState([]);
  const classes = useStyles();
  const descricaoBotao = formulario.id === 0 ? 'CADASTRAR' : 'ALTERAR'
  useEffect(() => {
    async function pegaCarteiras() {
      let carteiras = await retornaCarteiras();
      setCarteiras(carteiras);
    }

    pegaCarteiras();
  }, []);

  let MenuCarteira = Menu(carteiras);

  let TextFieldCarteira = (
    <TextField
      id="carteira"
      label="Carteira"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.carteira}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, carteira: event.target.value })
      }
    >
      {MenuCarteira}
    </TextField>
  );

  return (
    <Box className="Formularios">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="descricao"
          label="Descricao"
          variant="outlined"
          size="small"
          style={{ width: 150 }}
          required={true}
          value={formulario.descricao}
          onChange={(event) =>
            setFormulario({ ...formulario, descricao: event.target.value })
          }
        />

        {TextFieldCarteira}

        <TextField
          id="valor"
          label="Valor"
          variant="outlined"
          size="small"
          style={{ width: 80 }}
          value={formulario.valor}
          onChange={(event) =>
            setFormulario({ ...formulario, valor: event.target.value })
          }
        />
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            await insereReceita(formulario);
            setFormulario(emptyFormularioReceita);
            setStateTotais(
              await calculaTotais(stateCheckedDespesas, stateCheckedReceitas, stateMesAtual )
            );
          }}
        >
          {descricaoBotao}
        </Button>
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={() => { setFormulario(emptyFormularioReceita) }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
