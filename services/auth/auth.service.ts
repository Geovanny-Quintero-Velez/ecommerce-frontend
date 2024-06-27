import { CreateUser } from '@/interfaces/user/create-user';
import { User } from '@/interfaces/user/user';
import { LoginResponse } from '@/interfaces/user/login-response';
import axios, { AxiosInstance } from 'axios';

export class AuthService {
  protected readonly axios: AxiosInstance;

  public constructor() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseURL) {
      throw new Error('The NEXT_PUBLIC_BASE_URL environment variable is not defined');
    }

    this.axios = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 3000,
      timeoutErrorMessage: 'Request timed out'
    });
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.axios.post('/auth/login', { email, password });
      return response.data as LoginResponse;
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        throw new Error('An unexpected error occurred during login');
      }
    }
  }

  public async register(user: CreateUser): Promise<User> {
    try {
      const response = await this.axios.post('/auth/register', user);
      return response.data as User;
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        throw new Error('An unexpected error occurred during registration');
      }
    }
  }
}
