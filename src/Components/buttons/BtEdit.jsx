import React from 'react';
import './buttonCss/button.css';
import PropTypes from 'prop-types';
import Button from './Button';

export default function BtEdit(props) {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      buttonClass="btn btn-info bt-table bt-edit"
      title=""
    />
  );
}


BtEdit.propTypes = {
  onClick: PropTypes.func.isRequired,
};
