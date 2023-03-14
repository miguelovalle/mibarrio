
export const geolocation = async( placeName ) => {
   
    const urlGoogle="https://maps.googleapis.com/maps/api/geocode/json?address="
    const apyKey=  process.env.REACT_APP_GOOGLE_KEY;
    const url= urlGoogle + encodeURIComponent(placeName) + "&key=" + apyKey;
    const resp = await fetch( url );
    const data = await resp.json();
    if (data.status==='OK') {
        const lat= parseFloat(data.results[0].geometry.location.lat);
        const long=parseFloat(data.results[0].geometry.location.lng);
        sessionStorage.setItem("lat", lat);
        sessionStorage.setItem("long", long );            
        localStorage.setItem("lat", lat);
        localStorage.setItem("long", long);
   
        const position={lat, long}
        return position    
    } else {
        return null
    }
}