import { useQuery } from "react-query";
import axios from "axios";

const useGetUserAccounts = async () => {
  // fetch all users

  const { savings_account_data } = await axios({
    url: "/api/userSavingsAccounts",
    method: "GET",
    headers: {
      "x-access-token": `${localStorage.jwt}`,
    },
  });
  const { current_account_data } = await axios({
    url: "/api/userCurrentAccounts",
    method: "GET",
    headers: {
      "x-access-token": `${localStorage.jwt}`,
    },
  });
  let data = savings_account_data.accounts.concat(current_account_data.accounts);
  return data;
};

export default function useApi() {
  return useQuery(["users"], useGetUserAccounts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
