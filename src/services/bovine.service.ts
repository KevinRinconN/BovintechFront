import { bovintechApi } from "@/api/bovintech.api";
import { Bovine } from "@/types/bovine.types";
import { ApiInterface, Page } from "@/types/common.types";

export const getCattle = async (
  size = 10,
  page = 0
): Promise<ApiInterface<Page<Bovine>>> => {
  const { data } = await bovintechApi.get<ApiInterface<Page<Bovine>>>(
    `/cattle?size=${size}&page=${page}`
  );
  return data;
};

export const getCattleByGender = async (
  gender: "BULL" | "COW"
): Promise<ApiInterface<Page<Bovine>>> => {
  const { data } = await bovintechApi.get<ApiInterface<Page<Bovine>>>(
    `/cattle?gender=${gender}`
  );
  return data;
};

export interface CreateBovine {
  date_of_birth: string;
  gender: string;
  breed: string;
  brand: string;
  distinctive_trait: string;
  sireId: string;
  damId: string;
}

export const createBovine = async (bovine: CreateBovine) => {
  await bovintechApi.post<ApiInterface<Bovine>>("/cattle", bovine);
};
