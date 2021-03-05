import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardActionArea from "@material-ui/core/CardActionArea";
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  botao: {
    backgroundColor: "#F9FEFB",
    maxWidth: "100%",
    minHeight: 36,
    borderRadius: 5,
    textAlign: "center",

    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    
  },
}));

export default function DialogSelect({stateAnoAtual, setStateAnoAtual}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ano, setAno] = React.useState(stateAnoAtual);

  const handleChange = (event) => {
    setAno(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = () =>{
      setOpen(false)
      setStateAnoAtual(ano)
  }

  return (
    <div>
      <CardActionArea onClick={handleClickOpen} className={classes.botao}>{stateAnoAtual}</CardActionArea>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Selecione o Ano</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
           
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Ano</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={ano}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}