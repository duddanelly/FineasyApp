import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5208';

interface LoginResponse {
  token: string;
  [key: string]: any;
}

interface RegisterResponse {
  [key: string]: any;
}

interface ConfirmEmailResponse {
  [key: string]: any;
}

interface ResendConfirmationEmailResponse {
  [key: string]: any;
}

interface ForgotPasswordResponse {
  [key: string]: any;
}

interface ResetPasswordResponse {
  [key: string]: any;
}

interface ProtectedResourceResponse {
  [key: string]: any;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password });

    const accessToken = response.data.accessToken;

    if (accessToken) {
      await AsyncStorage.setItem('userToken', accessToken);
    } else {
      console.error('Login response did not include an accessToken.');
      throw new Error('Login response did not include an accessToken.');
    }
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const register = async (email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};

export const confirmEmail = async (token: string): Promise<ConfirmEmailResponse> => {
  try {
    const response = await axios.get<ConfirmEmailResponse>(`${API_URL}/confirmEmail`, { params: { token } });
    return response.data;
  } catch (error) {
    console.error('Failed to confirm email:', error);
    throw error;
  }
};

export const resendConfirmationEmail = async (email: string): Promise<ResendConfirmationEmailResponse> => {
  try {
    const response = await axios.post<ResendConfirmationEmailResponse>(`${API_URL}/resendConfirmationEmail`, { email });
    return response.data;
  } catch (error) {
    console.error('Failed to resend confirmation email:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(`${API_URL}/forgotPassword`, { email });
    return response.data;
  } catch (error) {
    console.error('Failed to send forgot password email:', error);
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<ResetPasswordResponse> => {
  try {
    const response = await axios.post<ResetPasswordResponse>(`${API_URL}/resetPassword`, { token, newPassword });
    return response.data;
  } catch (error) {
    console.error('Failed to reset password:', error);
    throw error;
  }
};

// Função para recuperar o token do AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Failed to get token:', error);
    throw error;
  }
};

export const getProtectedResource = async (): Promise<ProtectedResourceResponse> => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get<ProtectedResourceResponse>(`${API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch protected resource:', error);
    throw error;
  }
};
