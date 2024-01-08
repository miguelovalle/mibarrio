import { useReducer } from "react";
import { aggregateReducer } from "../reducers/aggregateReducer";
let newList;
export const useAggregates = (prevList) => {
  const [itemState, dispatch] = useReducer(aggregateReducer, prevList);

  const handleSumItem = () => {
    newList = itemState.map((item) =>
      item.map((obj) => {
        if (obj.id === newList.id) {
          return {
            ...obj,
            total: obj?.total + 1,
          };
        }
        return obj;
      })
    );
    // settotalList(prevList.current);
    //console.log('state luego de click', totalList);

    const action = {
      type: "QTY_SUM",
      payload: newList,
    };

    dispatch(action);
  };
  const handleRestItem = () => {
    const action = {
      type: "QTY_REST",
      payload: itemState,
    };

    dispatch(action);
  };

  return {
    handleSumItem,
    handleRestItem,
  };
};
