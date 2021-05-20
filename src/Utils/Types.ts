export interface post_response {
  success: boolean,
  statusCode: number,
  data: object | null,
  token: string,
}
export interface get_response {
  success: boolean,
  statusCode: number,
  data: object | null,
  message: string
}

export interface error_response {
  success: boolean;
  statusCode: number;
  data: null;
  errorMessage: string
}

export interface fail_response {
  success: boolean;
  statusCode: number;
  message: string;
}
export interface TicketObject {
  movieName: string,
  movieStartTime: string,
  movieEndTime: string,
  status: string
}
export interface UserObject {
  username: string,
  email: string,
  phoneNo: string,
  password: string,
  address: string,
}