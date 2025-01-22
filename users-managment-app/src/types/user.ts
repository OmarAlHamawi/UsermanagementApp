export interface User {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    mobile: string;
    email: string;
    country: string;
  }
  
  export interface UserRequest extends Omit<User, 'id'> {
    password: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    username: string;
    role: string;
    token: string;
  }
  
  export interface RegisterRequest extends UserRequest {}
  
  export interface ApiResponse {
    message: string;
  }