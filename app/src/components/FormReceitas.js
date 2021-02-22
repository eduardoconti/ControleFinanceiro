import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { insereReceita } from '../common/ReceitaFuncoes'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const emptyFormulario = {
  descricao: "",
  carteira: 1,
  valor: 0,
  pago: false,
  pagamento: new Date().toISOString().slice(0, 10),

}

function Menu(object) {
  return object.map((obj, i) => {
    return <MenuItem key={i} value={obj.id}> {obj.descricao}</MenuItem>
  })
}

export default function FormReceitas() {

  const [carteiras, setCarteiras] = useState([]);
  const [formulario, setFormulario] = useState(emptyFormulario);
  const classes = useStyles();

  useEffect(() => {

    async function pegaCarteiras() {
      let carteiras = await retornaCarteiras();
      setCarteiras(carteiras);
    }

    pegaCarteiras();
  }, []);

  let MenuCarteira = Menu(carteiras)

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
    <div className="Formularios" >
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
      </form>
      <Button
        variant="contained"
        size="small"
        style={{ margin: 5 }}
        onClick={async () => {
          await insereReceita(formulario)
          setFormulario(emptyFormulario)
        }}
      >
        CADASTRAR
      </Button>
    </div>
  );
}
