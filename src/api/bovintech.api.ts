import { BASE_API } from "@/utils/contants.utils";
import { getSession } from "@/utils/getSession";
import axios from "axios";

const bovintechApi = axios.create({
  baseURL: BASE_API,
});

bovintechApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.user.access_token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { bovintechApi };
