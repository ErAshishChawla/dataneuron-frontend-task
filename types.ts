export type User = {
  _id: string;
  name: string;
};

export interface ApiResponseType {
  status: number;
  message: string;
  data?: { [key: string]: any };
  success: boolean;
}
