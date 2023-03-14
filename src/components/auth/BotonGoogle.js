import React from 'react'
import GoogleLogin from 'react-google-login';
export const BotonGoogle = () => {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <GoogleLogin 
    clientId="589728940404-vctiu7p77aptbltv72cd4qfu385h8i4h.apps.googleusercontent.com"
 
    buttonText="Registrarse con Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
  )
}
