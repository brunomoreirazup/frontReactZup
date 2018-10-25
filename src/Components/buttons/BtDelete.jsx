import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function BtDelete(props) {
  const { onClick } = props;
  return (
    <Button
      onClick={onClick}
      buttonClass="btn btn-danger bt-table bt-delete"
      title=""
    />
  );
}

BtDelete.propTypes = {
  onClick: PropTypes.func.isRequired,
};
