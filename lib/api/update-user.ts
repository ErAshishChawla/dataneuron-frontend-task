import { AxiosError } from "axios";

import { api } from "./api-instance";

import { apiPaths } from "./api-paths";

import { UpdateUserFormValues } from "@/zod-schemas/api/update-user-form-api";

import { ApiResponseType } from "@/types";

export const updateUser = async (data: UpdateUserFormValues) => {
  try {
    const response = await api.patch<ApiResponseType>(
      apiPaths.editUser(),
      data
    );

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
