/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

export default function BtnAdd(props) {
  const { click, title } = props;
  return (
    <button type="button" id="btAdd" className="btn btn-success" onClick={click}>
      Adiciona { title }
    </button>
  );
}

BtnAdd.propTypes = {
  click: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
};
