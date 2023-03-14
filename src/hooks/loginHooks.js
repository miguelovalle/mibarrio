import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchSinToken } from '../helpers/fetch';

export const useLogin = login => {
  console.log(login);
  const flogin = async () => {
    const resp = await fetchSinToken('auth/', login, 'POST');
    const data = await resp.json();
    return data;
  };
  return useQuery(['login'], flogin);
};
export const useAdduser = () => {
  const newUser = async user => {
    const resp = await fetchSinToken('auth/new', user, 'POST');
    const data = await resp.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    return data;
  };
  return useMutation(newUser);
};

export const useGeolocation = options => {
  const [position, setPosition] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    let canceled = false;
    navigator.geolocation.getCurrentPosition(
      position => {
        if (!canceled) {
          setPosition(position);
        }
      },
      error => {
        if (!canceled) {
          setError(error);
        }
      },
      options
    );

    return () => {
      canceled = true;
    };
  }, [options]);

  return [position, error];
};
