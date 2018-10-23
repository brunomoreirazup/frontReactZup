import React from 'react';

export default function reduce(state = {}, action) {
  if (action.type === 'TOGGLE_MAIN_MODAL') {
    const newState = Object.assign({}, state);

    if (action.modalOpen === undefined) {
      newState.modalOpen = !newState.modalOpen;
    } else {
      newState.modalOpen = action.modalOpen;
    }
    return newState;
  }

  if (action.type === 'MAIN_MODAL_CONTENT') {
    const newState = Object.assign({}, state);
    newState.modalContent = action.modalContent;
    return newState;
  }

  if (action.type === 'CHANGE_MODAL_CONTENT') {
    let alertContent = '';
    if (action.showAlert === 'success') {
      alertContent = <div className="alert alert-info" role="alert">Operação realizada com sucesso</div>;
    }
    if (action.showAlert === 'fail') {
      alertContent = <div className="alert alert-danger" role="alert">Não foi possível realizar a operação!</div>;
    }
    if (action.showAlert === 'blank') {
      alertContent = <div className="alert alert-warning" role="alert">Preencha todos os campos</div>;
    }
    const newState = Object.assign({}, state);
    newState.modalContent.alerts = alertContent;
    return newState;
  }
  return state;
}
