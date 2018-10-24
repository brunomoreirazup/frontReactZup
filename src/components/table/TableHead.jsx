import React from 'react';
import PropTypes from 'prop-types';

export default function TableHead(props) {
  const { children } = props;
  return (

    <thead className="thead-dark">
      {children}
    </thead>

  );
}
TableHead.propTypes = {
  children: PropTypes.element.isRequired,
};
