import axios from 'axios';
import {API_URL} from '@env';
import authHeader from './authHeader';

export default class AuthApi {
  async login(userData: any) {
    return axios.post(`${API_URL}/auth/login`, userData);
  }
  async logout() {
    const headers = {headers: authHeader.getAuthHeader()};
    console.log('Logging out');
    return axios.get(`${API_URL}/auth/logout`, headers);
  }
}
