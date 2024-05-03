import { AxiosError } from "axios";

import { api } from "./api-instance";

import { apiPaths } from "./api-paths";

import { AddUserFormValues } from "@/zod-schemas/add-user-form-schema";

import { ApiResponseType } from "@/types";

export const addUser = async (data: AddUserFormValues) => {
  try {
    const response = await api.put<ApiResponseType>(apiPaths.addUser(), data);

    const apiResponse = response.data as ApiResponseType;

    return apiResponse;
  } catch (error) {
    console.log("[ADD_USER]", error);

    let apiResponse: ApiResponseType = {
      success: false,
      message: "Internal server error",
      status: 500,
    };

    if (
      error instanceof AxiosError &&
      error.response?.data &&
      (error.response?.data satisfies ApiResponseType)
    ) {
      apiResponse = error.response.data as ApiResponseType;
    }

    return apiResponse;
  }
};
