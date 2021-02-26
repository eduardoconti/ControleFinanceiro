
function stateAlert(message, type){
    return{
        isOpen: true,
        message: message,
        type: type
      }
}
export function retornaStateAlertAlteracaoFlagPago(codResponse, pago, tipo) {
    let message = ''
    let type = ''
  
    if (codResponse === 200) {
      message = 'Alterado ' + tipo +  ' para'  + (pago ? 'Pago' : 'Aberto')
      type = 'success'
    }
    else {
      message = 'Falha ao alterar ' + tipo
      type = 'error'
    }
  
    return stateAlert(message, type)
  }
  
  export function retornaStateAlertExclusao(codResponse, tipo) {
    let message = ''
    let type = ''
  
    if (codResponse === 200) {
      message = 'Excluido ' + tipo
      type = 'success'
    }
    else {
      message = 'Falha ao Excluir ' + tipo
      type = 'error'
    }
  
    return stateAlert(message, type)
  }
  
  export function retornaStateAlertCadastro(codResponse, tipo) {
    let message = ''
    let type = ''
  
    if (codResponse === 200 || codResponse === 201 ) {
      
      message = ( codResponse === 201 ? 'Inserido ' : 'Alterado ') + tipo
      type = 'success'
    }
    else {
      message = 'Falha ao Inserir/Alterar ' + tipo
      type = 'error'
    }
  
    return stateAlert(message, type)
  }

  export function AlertWarning( message ){
    return {
      isOpen: true,
      message: message,
      type: 'warning'
    }
  }
  