import React from 'react';
import { useDataContext } from './context/DataContext';

const App = () => {
  const test = useDataContext();
  console.log(test);

  return <div>App</div>;
};

export default App;
