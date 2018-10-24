import React from 'react';
import PropTypes from 'prop-types';

export default function MainTitle(props) {
  const { title } = props;
  return (
    <div className="MainTitle">
      <h1>{title}</h1>
    </div>
  );
}

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
