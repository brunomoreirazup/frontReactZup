import React from 'react';
import PropTypes from 'prop-types';

export default function TableBody(props) {
  const { children } = props;
  return (
    <tbody>
      {children}
    </tbody>
  );
}

TableBody.propTypes = {
  children: PropTypes.element.isRequired,
};
