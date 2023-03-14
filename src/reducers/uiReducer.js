
import { types } from "../types/types";
const initialState = {
    modalMapOpen: false,
    modalAddressOpen: false
}

export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.uiOpenAddressModal:
            return{
                ...state,
                modalAddressOpen: true
            }
      
        case types.uiCloseAddressModal:
            return {
                ...state,
                modalAddressOpen: false
            }
            case types.uiOpenMapModal:
                return{
                    ...state,
                    modalMapOpen: true
                }
          
            case types.uiCloseMapModal:
                return {
                    ...state,
                    modalMapOpen: false
                }
        default:
            return state;
    }
}