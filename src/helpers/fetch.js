const baseURL = process.env.REACT_APP_API_URL;

const fetchAddress = async placeName => {
  const urlGoogle =
    'https://maps.googleapis.com/maps/api/geocode/json?address=';
  const apyKey = process.env.REACT_APP_GOOGLE_KEY;
  const url = urlGoogle + encodeURIComponent(placeName) + '&key=' + apyKey;
  const resp = await fetch(url);
  const data = await resp.json();
  if (data.status === 'OK') {
    const lat = parseFloat(data.results[0].geometry.location.lat);
    const long = parseFloat(data.results[0].geometry.location.lng);
    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);
    return { lat: lat, long: long };
  } else {
    return null;
  }
};

const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`;
  const token = localStorage.getItem('token') || '';

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchSinToken, fetchConToken, fetchAddress };
