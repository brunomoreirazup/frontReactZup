import React, { Fragment } from 'react';
import './buttonCss/button.css';
import PropTypes from 'prop-types';

export default function BtEdit(props) {
  const { onClick } = props;
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-info bt-table bt-edit"
        onClick={onClick}
      />
    </Fragment>
  );
}


BtEdit.propTypes = {
  onClick: PropTypes.func.isRequired,
};
