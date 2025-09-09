import axios, { AxiosError } from 'axios';
import BASE_API_URL from '../rootAPI';

interface ApiError {
  message?: string;
  issues?: { message: string }[];
}

export const register = async (email: string, password: string, confirmPassword: string) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/register`, {
      email,
      password,
      confirmPassword,
    });
    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>;
    // Xử lý lỗi backend
    if (error.response?.data?.issues?.length) {
      const messages = error.response.data.issues.map(i => i.message);
      throw { messages }; // trả về mảng message
    } else {
      throw { messages: [error.response?.data?.message || error.message] };
    }
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>;
    if (error.response?.data?.issues?.length) {
      const messages = error.response.data.issues.map(i => i.message);
      throw { messages };
    } else {
      throw { messages: [error.response?.data?.message || error.message] };
    }
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/verify-otp`, {
      email,
      otp,
    });
    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>;
    if (error.response?.data?.issues?.length) {
      const messages = error.response.data.issues.map(i => i.message);
      throw { messages };
    } else {
      throw { messages: [error.response?.data?.message || error.message] };
    }
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/forgot-password`, {
      email,
    });
    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>;
    if (error.response?.data?.issues?.length) {
      const messages = error.response.data.issues.map(i => i.message);
      throw { messages };
    } else {
      throw { messages: [error.response?.data?.message || error.message] };
    }
  }
};

export const resendOtp = async (email: string) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/resend-otp`, { email });
    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>;
    if (error.response?.data?.issues?.length) {
      const messages = error.response.data.issues.map((i) => i.message);
      throw { messages };
    } else {
      throw { messages: [error.response?.data?.message || error.message] };
    }
  }
};

export const googleLogin = async (idToken: string) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/auth/google-login`, {
      idToken,
    });
    return res.data;
  } catch (err: unknown) {
    const error = err as AxiosError<ApiError>;
    if (error.response?.data?.issues?.length) {
      const messages = error.response.data.issues.map(i => i.message);
      throw { messages };
    } else {
      throw { messages: [error.response?.data?.message || error.message] };
    }
  }
};
