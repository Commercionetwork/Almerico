/**
 * Stake actions
 */

import api from "./api";

export default {
  /**
   * Action to fetch staking pool
   * 
   * @param {Function} commit 
   */
  async fetchPool({commit}){
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try{
      const response = await api.requestPool();
      commit("setPool", response.data);
    }
    catch (error) {
      if (error.response !== undefined) {
        commit("setMessage", error.response.data.error);
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  }
};
