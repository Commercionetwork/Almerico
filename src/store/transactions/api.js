/**
 * Transactions  APIs
 */
import axios from "axios";
import {
  API
} from "Constants";

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  /**
   * Handle ajax request to get a transactions list
   * 
   * @param {string} action 
   * @param {string} sender 
   * @param {number} page 
   * @param {number} limit 
   * @return {Promise}
   */
  requestTransactions(action, sender, page = 1, limit = 20) {
    return instance.get(`${API.TXS}?action=${action}&sender=${sender}&page=${page}&limit=${limit}`);
  },
  /**
   * Handle ajax request to get a transaction by hash
   * 
   * @param {string} hash 
   * @return {Promise}
   */
  requestTransaction(hash) {
    return instance.get(`${API.TXS}/${hash}`)
  }
};
