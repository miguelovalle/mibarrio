import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startRegister =  (user ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth/new',user, 'POST' );
        const body = await resp.json();
        console.log(body)
        if ( body.ok ) {  
            localStorage.setItem( 'token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.id,
                name: body.name
            }))
        } else {
            Swal.fire( 'Error',  body.msg, 'error' );
        }
    }   
};


export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() )
            
            dispatch(login({
                uid: body.id,
                name: body.name
            }))
            
        } else {
            Swal.fire( 'Error',  body.msg, 'error' );
        }
    }
} 

const login = ( user ) => ({
    type: types.authLogin,
    payload: user 
});

export const startLogout = () => {
     return( dispatch ) => {
        localStorage.clear();
      //  dispatch(eventLogout() );
        dispatch( logout() );        
    } 
  
}

const logout = () => ({ type: types.authLogout });