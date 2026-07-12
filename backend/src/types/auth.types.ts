export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface LoginDto {
  email: string;
  password: string;
}