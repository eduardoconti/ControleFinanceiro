import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { retornaCategorias } from "../common/CategoriaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
//import MenuItem from "./MenuItemForm";
import MenuItem from "@material-ui/core/MenuItem";
import { insereDespesa } from '../common/DepesaFuncoes'
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Menu(object) {
  return object.map((obj, i) => {
    return <MenuItem key={i} value={obj.id}> {obj.descricao}</MenuItem>
  })
}

export default function FormDespesas() {
  const [categorias, setCategorias] = useState([]);
  const [carteiras, setCarteiras] = useState([]);
  const [formulario, setFormulario] = useState({

    descricao: "",
    categoria: 0,
    carteira: 0,
    valor: 0,
    pago: false,
    pagamento: new Date(),
    vencimento: new Date(),

  });
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

  let MenuCategoria = Menu(categorias)
  let MenuCarteira = Menu(carteiras)
  let TextFieldCategoria = (
    <TextField
      id="categoria"
      label="Categoria"
      variant="outlined"
      size="small"
      style={{ width: 200 }}
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
      style={{ width: 200 }}
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
    <div
      style={{
        width: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="descricao"
          label="Descricao"
          variant="outlined"
          size="small"
          required={true}
          value={formulario.descricao}
          onChange={(event) =>
            setFormulario({ ...formulario, descricao: event.target.value })
          }
        />
        {TextFieldCategoria}
        {TextFieldCarteira}
        <TextField
          id="valor"
          label="Valor"
          variant="outlined"
          size="small"
          style={{ width: 60 }}
          value={formulario.valor}
          onChange={(event) =>
            setFormulario({ ...formulario, valor: event.target.value })
          }
        />
      </form>
      <Button
        variant="contained"
        size="small"
        style={{ margin: 5 }}
        onClick={async () => await insereDespesa(formulario)}
      >
        CADASTRAR
      </Button>
    </div>
  );
}
