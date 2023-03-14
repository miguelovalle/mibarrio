
const baseURL = process.env.REACT_APP_API_URL;

const fetchFormData = async( data, setalertLoad )=> {
    const img = data.picture[0];
    const nameImg=data.picture[0].name;
    const imgName = process.env.REACT_APP_IMG_URL + "/" + nameImg;
    if ( img ) {
        const formData= new FormData();
        formData.append('file', img )
        try {
          const res = await fetch( baseURL, {
            method: "POST",
            body: formData
          })
          
          if ( res.ok ) {
            sessionStorage.setItem("imgName", imgName);
            setalertLoad(true);
          } else {
            throw await res.json();
          }
        } catch (error) {
            throw error
        }
    }
  };

const fetchSInToken =  ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseURL }/${ endpoint }`;
     if (method === 'GET') {
        return fetch( url );
    } else {
         return fetch( url, {
             method,
             headers: {
                 "content-type": "application/json"
             },
             body: JSON.stringify( data ) 
         });
    } 

};

const fetchConToken =  ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseURL }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
         return fetch( url, {
             method,
             headers: {
                 "content-type": "application/json",
                 'x-token': token
             },
             body: JSON.stringify( data ) 
         });
    } 
};
 export { fetchSInToken, fetchConToken, fetchFormData }; 