import React from 'react';
import './buttonCss/button.css';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { onClick, buttonClass, title } = props;
  return (
    <React.Fragment>
      <button
        type="button"
        className={buttonClass}
        onClick={onClick}
      >
        {title}
      </button>
    </React.Fragment>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
