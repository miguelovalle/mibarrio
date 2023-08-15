export const geolocation = async (placeName) => {
  const urlGoogle =
    "https://maps.googleapis.com/maps/api/geocode/json?address=";

  const apyKey = import.meta.env.VITE_GOOGLE_KEY;

  const url = urlGoogle + encodeURIComponent(placeName) + "&key=" + apyKey;

  const resp = await fetch(url);

  const data = await resp.json();

  if (data.status === "OK") {
    const lat = parseFloat(data.results[0].geometry.location.lat);
    const lng = parseFloat(data.results[0].geometry.location.lng);
    const position = { lat, lng };
    return position;
  } else {
    return null;
  }
};
