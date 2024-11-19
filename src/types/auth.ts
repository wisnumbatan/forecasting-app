// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'analyst';
  organization?: string;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  dashboardLayout?: Record<string, any>;
}

export interface AuthResponse {
  user: User;
  token: string;
}