/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-flexdisable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function BtnAdd(props) {
  const { click, title } = props;
  return (
    <Button
      buttonClass="btn btn-success headerItem"
      onClick={click}
      title={'Adicionar '.concat(title)}
    />
  );
}

BtnAdd.propTypes = {
  click: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
