import React from 'react';
import './loading.css';
import loadImage from '../../../img/loading.gif';

export default function Loading() {
  return (
    <tbody>
      <tr>
        <td colSpan={5} className="loading">
          <img src={loadImage} className="load-image" alt="Loading..." />
        </td>
      </tr>
    </tbody>
  );
}
