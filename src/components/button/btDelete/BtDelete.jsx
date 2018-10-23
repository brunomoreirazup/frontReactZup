import React from 'react';
import '../buttonCss/button.css';
import PropTypes from 'prop-types';

export default function BtDelete(props) {
  const { onClick } = props;
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-danger bt-table bt-delete"
        onClick={onClick}
      />
    </React.Fragment>
  );
}

BtDelete.propTypes = {
  onClick: PropTypes.isRequired,
};
