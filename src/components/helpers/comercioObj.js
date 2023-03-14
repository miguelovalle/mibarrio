

export const comercioObj = () => {
  
    const tipo = sessionStorage.getItem( "tipo");       
    const name = sessionStorage.getItem( "name");       
    const  emblem = sessionStorage.getItem( "emblem");       
    const specialty = sessionStorage.getItem( "specialty");       
    const categories = sessionStorage.getItem( "categories");   
    const contact = sessionStorage.getItem( "contact");       
    const phone = sessionStorage.getItem( "phone");       
    const email = sessionStorage.getItem( "email");
    const passwd = sessionStorage.getItem("passwd");
    const lat = sessionStorage.getItem( "lat");       
    const long = sessionStorage.getItem( "long");       
    const address = sessionStorage.getItem( "address");       
    const cross = sessionStorage.getItem( "cross");       
    const imgName=sessionStorage.getItem("imgName");

    const negocio = {
        tipo,
        name,
        emblem,
        specialty,
        categories,
        contact,
        phone,
        email,
        passwd,
        lat,
        long,
        location:{ type: 'point', coordinates:[long, lat]},
        address,
        cross,
        imgName,
    };
    return negocio
}

