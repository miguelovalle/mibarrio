import { useState } from 'react';

const useCounter = (inicialState = 0) => {
  const [counter, setCounter] = useState(inicialState);

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    setCounter(counter - 1);
  };
  const reset = () => {
    setCounter(inicialState);
  };
  return {
    counter,
    increment,
    decrement,
    reset,
  };
};

export default useCounter;
