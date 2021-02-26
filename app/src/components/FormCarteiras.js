import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { insereCarteira, alteraCarteira } from "../common/CarteiraFuncoes";
import { Box } from "@material-ui/core";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { emptyFormularioCarteira, emptyAlertState } from "../common/EmptyStates"
import Alert from './Alert'
import { retornaStateAlertCadastro} from "../common/AlertFuncoes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
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

export default function FormCarteiras({ setRows, formulario, setFormulario }) {

  const classes = useStyles();
  const descricaoBotao = formulario.id === 0 ? 'CADASTRAR' : 'ALTERAR'
  const [alert, setAlert] = useState(emptyAlertState)
  
  return (
    <Box className="Formularios">
       <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
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
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            let response
            if (formulario.id === 0) {
              response = await insereCarteira(formulario);
            } else {
              response = await alteraCarteira(formulario)
            }

            setRows(await retornaCarteiras())
            setFormulario(emptyFormularioCarteira)
            setAlert(retornaStateAlertCadastro(response,'Categoria'))
          }}
        >
          {descricaoBotao}
        </Button>

        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            setFormulario(emptyFormularioCarteira)
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
