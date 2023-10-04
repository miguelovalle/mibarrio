export default function orderReducer(order, action) {
  let listOne = [];
  let listCheck = [];
  let itemsCount = 0;

  switch (action.type) {
    case "listRadio": {
      const subElement = action.payload;
      const setOrderTotal = action.total;

      listOne.length > 0 &&
        Number(subElement.price) > 0 &&
        setOrderTotal(orderTotal - Number(subElement?.price));
      listOne = [];
      listOne.push(subElement.item);
      //    setListOne([subElement.item]);
      Number(subElement.price) > 0 &&
        setOrderTotal(orderTotal + Number(subElement?.price));
      return [[...listOne], order[1], order[2]];
    }
    case "listCheck": {
      const { checked, itemsCount, maxItems } = action;
      const subElement = action.payload;
      let auxCheck = [...order[1]];
      const append = () => {
        const valIndex = auxCheck.indexOf(subElement?.item); // if the item is already in the list, retrieve the index
        if (checked && valIndex === -1) {
          // -1 if not found
          auxCheck = [...auxCheck, subElement?.item];
        }
        if (!checked && valIndex > -1) {
          auxCheck.splice(valIndex, 1);
        }
      };
      maxItems === 0 && append();

      maxItems > 0 && itemsCount < maxItems && append();
      return [order[0], [...auxCheck], order[2]];
    }

    case "listRest": {
      const subElement = action.payload;
      let listAux = order[2];
      const newList = listAux.map((item) => {
        if (item.item === subElement.item) {
          return { cantidad: item.cantidad - 1, item: item.item };
        }
        return item;
      });
      return [order[0], order[1], [...newList]];
    }

    case "addList": {
      const subElement = action.payload;
      let listAux = order[2];
      listAux = [...listAux, { cantidad: 1, item: subElement.item }];
      console.log(listAux);
      return [order[0], order[1], [...listAux]];
    }

    case "updateList": {
      const subElement = action.payload;
      let listAux = order[2];
      const newList = listAux.map((item) => {
        if (item.item === subElement.item) {
          return { cantidad: item.cantidad + 1, item: item.item };
        }
        return item;
      });
      return [order[0], order[1], [...newList]];
    }
    default:
      break;
  }
}
