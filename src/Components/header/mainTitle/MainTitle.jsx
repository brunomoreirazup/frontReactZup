import React from 'react';
import PropTypes from 'prop-types';

export default function MainTitle(props) {
  const { title } = props;
  return (
    <h1 className="MainTitle headerItem">{title}</h1>
  );
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
