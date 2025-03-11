import React from 'react';

import './movies-rate.css';

const MoviesRate = ({ rate }) => {
  const borderColor = rate < 3 ? 'red' : rate < 5 ? 'orange' : rate < 7 ? 'yellow' : 'green';
  return (
    <div className={`movies__rate movies__rate--borderColor--${borderColor}`}>
      <span>{rate.toFixed(1)}</span>
    </div>
  );
};

export default MoviesRate;
