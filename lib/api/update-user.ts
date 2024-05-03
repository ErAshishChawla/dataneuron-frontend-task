import { AxiosError } from "axios";

import { api } from "./api-instance";

import { apiPaths } from "./api-paths";

import { UpdateUserFormValues } from "@/zod-schemas/api/update-user-form-api";

import { ApiResponseType } from "@/types";

// Purpose: Update a user in the database.
export const updateUser = async (data: UpdateUserFormValues) => {
  try {
    // Make a PATCH request to the server to update a user
    const response = await api.patch<ApiResponseType>(
      apiPaths.editUser(),
      data
    );

    // Get the response data
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
