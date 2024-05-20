import { bovintechApi } from "@/api/bovintech.api";
import { AccesToken, User } from "@/types/auth.types";
import { ApiInterface } from "@/types/common.types";
import { BASE_API } from "@/utils/contants.utils";
import axios from "axios";

export const getToken = async (
  username: string,
  password: string
): Promise<AccesToken> => {
  try {
    const { data } = await axios.post<ApiInterface<AccesToken>>(
      `${BASE_API}/auth/login`,
      {
        username,
        password,
      }
    );
    return data.data;
  } catch (error) {
    throw new Error("Unable to login");
  }
};

export const getMe = async (token: string): Promise<User> => {
  try {
    const { data } = await axios.get<ApiInterface<User>>(
      `${BASE_API}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const greeting = async () => {
  try {
    const data = await bovintechApi.get<string>("/auth/hi");
    console.log(data);
    return "data";
  } catch (error) {
    console.log(error);
  }
  return;
};
