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

export interface modal {
  _id: string,
  profile_picture: String,
  email_id: String,
  First_Name: String,
  Last_Name: String,
  Gender: String,
  Phone_Number: Number,
  Dateofbirth: Date
}

export interface Unauthorized {
  success: Boolean,
  statusCode: number,
  message: String,
};
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
export interface UserModel {
  _id: string,
  username: string,
  email: string,
  phoneNo: string,
  password: string,
  address: string,
  ticketIds: string,
  __v: number
}