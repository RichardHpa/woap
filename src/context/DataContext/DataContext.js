import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useQuery } from 'react-query';

const getData = async () => {
  return axios
    .get(
      `https://visawoap.com/api/venues/page:1/limit:2000/.json?key=4e44f1ac85cd60e3caa56bfd4afb675e`
    )
    .then((res) => res.data);
};

const EVENT_TYPES = {
  BURGER: '41',
  DINE: '44',
  COCKTAIL: '43',
  EVENT: '45',
};

const DataContext = createContext();
const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState();

  const { data, isLoading } = useQuery('all-venues', getData);

  useEffect(() => {
    setAllData(data?.venues);
  }, [data]);

  const contextValues = {
    allData,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {isLoading || allData === undefined ? 'loading' : children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataProvider, useDataContext, EVENT_TYPES };
