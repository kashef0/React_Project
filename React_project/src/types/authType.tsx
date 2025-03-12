export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }

  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  }
  export interface LoginRequest {
    email: string;
    password: string;
  }