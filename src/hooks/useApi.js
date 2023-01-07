import { useQuery } from "react-query";
import axios from "axios";

const callApi = async (url, method, noAuth, body) => {

  const { data } = await axios({
    url: url,
    method: method,
    headers: {
      Authorization: !noAuth && `Bearer ${localStorage.jwt}`
    },
    data: body
  });
  return data;
};

export default function useApi(url, method, headers, body, name = "call") {
  return useQuery([name, url, method, headers, body], () => callApi(url, method, headers, body));
}