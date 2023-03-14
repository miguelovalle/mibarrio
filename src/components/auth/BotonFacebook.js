import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';

export const BotonFacebook = () => {
    const [nombre, setnombre] = useState(null);
    const [correo, setcorreo] = useState(null)
    
    const responseFacebook = (response) => {
        setnombre(response.name);
        setcorreo(response.email);
    };

    return (
        <FacebookLogin
            appId="711431329681786"
            autoLoad={false}
           fields="name, email, picture"
  //          onClick={componentClicked}
            callback={responseFacebook}
            textButton="Registrarse con Facebook"
            icon="fa-facebook" 
        />, nombre, correo
    )
}
