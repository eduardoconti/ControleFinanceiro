import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { retornaCategorias } from "../common/CategoriaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { insereDespesa } from "../common/DepesaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioDespesa } from "../common/EmptyStates";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    flexWrap: "wrap",
    alignItems:'center'
  },
}));

const emptyFormulario = {
  descricao: "",
  categoria: 1,
  carteira: 1,
  valor: 0,
  pago: false,
  pagamento: new Date().toISOString().slice(0, 10),
  vencimento: new Date().toISOString().slice(0, 10),
};

function Menu(object) {
  return object.map((obj, i) => {
    return (
      <MenuItem key={i} value={obj.id}>
        {obj.descricao}
      </MenuItem>
    );
  });
}

export default function FormDespesas({
  stateCheckedDespesas,
  stateCheckedReceitas,
  setStateTotais,
  setFormulario,
  formulario,
}) {
  const [categorias, setCategorias] = useState([]);
  const [carteiras, setCarteiras] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    async function pegaCategorias() {
      let categorias = await retornaCategorias();
      setCategorias(categorias);
    }

    async function pegaCarteiras() {
      let carteiras = await retornaCarteiras();
      setCarteiras(carteiras);
    }

    pegaCategorias();
    pegaCarteiras();
  }, []);

  let MenuCategoria = Menu(categorias);
  let MenuCarteira = Menu(carteiras);
  let TextFieldCategoria = (
    <TextField
      id="categoria"
      label="Categoria"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.categoria}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, categoria: event.target.value })
      }
    >
      {MenuCategoria}
    </TextField>
  );

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
        {TextFieldCategoria}
        {TextFieldCarteira}
        <TextField
          id="vencimento"
          label="Vencimento"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formulario.vencimento}
          size="small"
          onChange={(event) =>
            setFormulario({ ...formulario, vencimento: event.target.value })
          }
        />
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
          style={{ margin: 5 }}
          onClick={async () => {
            await insereDespesa(formulario);
            setFormulario(emptyFormularioDespesa);
            setStateTotais(
              await calculaTotais(stateCheckedDespesas, stateCheckedReceitas)
            );
          }}
        >
          CADASTRAR
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ margin: 5 }}
          onClick={ () => { setFormulario(emptyFormularioDespesa) } }
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
