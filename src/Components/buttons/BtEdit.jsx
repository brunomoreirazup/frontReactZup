import React from 'react';
import './buttonCss/button.css';
import PropTypes from 'prop-types';

export default function BtEdit(props) {
  const { onClick } = props;
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-info bt-table bt-edit"
        onClick={onClick}
      />
    </React.Fragment>
  );
}


BtEdit.propTypes = {
  onClick: PropTypes.func.isRequired,
};
