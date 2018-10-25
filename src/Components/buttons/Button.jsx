import React, { Fragment } from 'react';
import './buttonCss/button.css';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { onClick, buttonClass, title } = props;
  return (
    <Fragment>
      <button
        type="button"
        className={buttonClass}
        onClick={onClick}
      >
        {title}
      </button>
    </Fragment>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
