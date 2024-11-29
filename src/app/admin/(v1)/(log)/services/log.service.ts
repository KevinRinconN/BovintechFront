import { bovintechApi } from "@/api/bovintech.api";
import { ApiInterface, Page } from "@/types/common.types";
import { Log } from "../types/log.type";

export const getLogs = async (
    action: string = "",
    modules: string = "",
    date: string = "",
    operators: string = ""
  ) => {
    console.log(action);
    const { data } = await bovintechApi.get<ApiInterface<Page<Log>>>(
      `/log?action=${action}&module=${modules}&date=${date}&operators=${operators}`
    );
    return data;
  };