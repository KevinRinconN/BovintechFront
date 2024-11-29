import { bovintechApi } from "@/api/bovintech.api";
import { formatDateToBack } from "@/lib/utils";
import {
  BirthRecord,
  Bovine,
  DetailsBovine,
  Lot,
  Operator,
  Records,
} from "@/types/bovine.types";
import { ApiInterface, Page } from "@/types/common.types";



export const getOperators = async()=> {
  const { data } = await bovintechApi.get<ApiInterface<Operator[]>>(
    `/auth/operators`
  );
  
  return data;
}




export const getLotsByUser = async() => {
  const { data } = await bovintechApi.get<ApiInterface<Page<Lot>>>(
    `/cattle/lot`
  );
  return data;
}

export const getLotList = async() => {
  const { data } = await bovintechApi.get<ApiInterface<Lot[]>>(
    `/cattle/lots`
  );
  return data;
}

export const createLot = async(name: string, description?: string, operator?: string) => {
  const { data } = await bovintechApi.post<ApiInterface<Lot>>(
    `/cattle/lot`, {
      name,
      description, 
      operator
    }
  );
  return data;
}

export const getCattle = async (
  idLot: string = "",
  brand: string ="",
  breed: string = "",
  gender: string ="",
  size = "10",
  page = "0"
): Promise<ApiInterface<Page<Bovine>>> => {
  const { data } = await bovintechApi.get<ApiInterface<Page<Bovine>>>(
    `/cattle?lotId=${idLot}&size=${size}&page=${page}&brand=${brand}&breed=${breed}&gender=${gender}`
  );
  return data;
};

export const getCattleById = async (id: number) => {
  const { data } = await bovintechApi.get<ApiInterface<DetailsBovine>>(
    `/cattle/${id}`
  );
  return data;
};

export const getOffSpring = async (id: string, size = 10, page = 0) => {
  const { data } = await bovintechApi.get<ApiInterface<Page<Bovine>>>(
    `/cattle/offspring/${id}?size=${size}&page=${page}`
  );
  return data;
};

export const getBirthByCattle = async (id: string) => {
  const { data } = await bovintechApi.get<ApiInterface<BirthRecord>>(
    `/cattle/${id}/birth`
  );
  return data;
};

export const getRecordsByCattleId = async (id: string) => {
  const { data } = await bovintechApi.get<ApiInterface<Records[]>>(
    `/record/by-cattle/${id}`
  );
  return data;
};

export const saveNewBirth = async (
  id: string,
  insemination_date: Date,
  IdSire: string
) => {
  const date = formatDateToBack(insemination_date);

  const { data } = await bovintechApi.post<ApiInterface<any>>(
    `cattle/${id}/birth`,
    {
      insemination_date: date,
      IdSire,
    }
  );
  return data;
};

export const saveRecordBirth = async (
  id: string,
  brand: string,
  gender: string,
  breed: string,
  distinctiveTrait: string,
  birthDate: Date, // en formato "dd/MM/yyyy"
  weight: string,
  imgFile: File
) => {
  const date = formatDateToBack(birthDate);

  const formData = new FormData();

  formData.append("brand", brand);
  formData.append("gender", gender);
  formData.append("breed", breed);
  formData.append("distinctiveTrait", distinctiveTrait);
  formData.append("birthDate", date);
  formData.append("weight", weight);
  formData.append("img", imgFile);

  const { data } = await bovintechApi.post<ApiInterface<Records>>(
    `/cattle/birth/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const saveRecordByCattle = async (
  id: string,
  dateOfRecord: Date, // en formato "dd/MM/yyyy"
  weight: string,
  imgFile: File
) => {
  const date = formatDateToBack(dateOfRecord);

  const formData = new FormData();
  formData.append("date_of_record", date);
  formData.append("weight", weight);
  formData.append("img", imgFile);

  const { data } = await bovintechApi.post<ApiInterface<Records>>(
    `/record/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
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
