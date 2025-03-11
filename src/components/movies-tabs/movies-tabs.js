import React from 'react';
import { Tabs } from 'antd';

const MoviesTabs = ({ items }) => {
  return <Tabs centered items={items} className="movies__tabs" />;
};

export default MoviesTabs;
