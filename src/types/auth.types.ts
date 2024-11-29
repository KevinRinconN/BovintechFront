export type AuthStatus =
  | "Success"
  | "Invalid credentials"
  | "Pending"
  | "Something went wrong"
  | "Unknown Error";

export interface AccesToken {
  access_token: string;
}

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  rol: string;
}
