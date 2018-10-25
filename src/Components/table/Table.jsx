import React from 'react';
import PropTypes, { element } from 'prop-types';

export default function Table(props) {
  const { children } = props;
  return (

    <table className="table table-responsive table-bordered table-hover alinha container">
      {children}
    </table>

  );
}
Table.propTypes = {
  children: PropTypes.arrayOf(element).isRequired,
};
