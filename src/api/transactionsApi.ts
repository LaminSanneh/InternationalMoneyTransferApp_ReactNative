import axios from 'axios';
import {API_URL} from '@env';
import authHeader from './authHeader';

export default class TransactionApi {
  async getTransactions() {
    const headers = {headers: authHeader.getAuthHeader()};
    return axios.get(`${API_URL}/transactions`, headers);
  }
  async addTransaction(transactionData: any) {
    const headers = {headers: authHeader.getAuthHeader()};
    return axios.post(`${API_URL}/transactions`, transactionData, headers);
  }
}
