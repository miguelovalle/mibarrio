import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSinToken } from "../components/helpers/fetch";

export const useLogin = (mail, hasMail) => {
  const flogin = async () => {
    const resp = await fetchSinToken(
      "auth",
      { mail: mail.email, password: mail.password },
      "POST"
    );

    const data = await resp.json();
    return data;
  };
  return useQuery({
    queryKey: ["login", mail, hasMail],
    queryFn: flogin,
    enabled: hasMail,
  });
};

export const useUserDetail = (id) => {
  const user = async () => {
    const resp = await fetchSinToken("auth/userDetail", { id }, "POST");
    const data = await resp.json();
    return data;
  };
  return useQuery({ queryKey: ["user"], queryFn: user });
};

export const useAdduser = () => {
  const addUser = async ({ user }) => {
    const resp = await fetchSinToken("auth/new", user, "POST");
    const data = await resp.json();
    return data;
  };
  return useMutation(
    { mutationFn: addUser },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["user"]);
      },
    }
  );
};

export const useMutateAddAddress = () => {
  const addAddress = async (props) => {
    const id = props.id;
    const address = props.address;
    const resp = await fetchSinToken(
      "auth/addAddress",
      { id, address },
      "POST"
    );
    const data = await resp.json();
    return data;
  };
  return useMutation(
    { mutationFn: addAddress },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["user"]);
      },
    }
  );
};

export const useGeolocation = (options) => {
  const [position, setPosition] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    let canceled = false;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          setPosition(position);
        }
      },
      (error) => {
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
