/**
 * Account actions
 */

import api from "./api";

export default {
  /**
   * Action to fetch account's data by address
   * 
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} address 
   */
  async fetchAccount({ commit, dispatch }, address) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      await dispatch("fetchMembership", address);
      await dispatch("fetchBalances", address);
      await dispatch("fetchDelegations", address);
      await dispatch("fetchRewards", address);
      await dispatch("fetchUnbondingDelegations", address);
    } catch (error) {
      if (error.response) {
        commit("setMessage", error.response.data.error);
      } else if (error.request) {
        commit("setMessage", "Request error");
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  },
  /**
   * Action to fetch account's balances
   * 
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchBalances({
    commit
  }, address) {
    try {
      const response = await api.requestBalances(address);
      commit("setBalances", response.data.result);
    } catch (error) {
      throw error;
    }
  },
  /**
   * Action to fetch account's delegations
   * 
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchDelegations({
    commit
  }, address) {
    try {
      const response = await api.requestDelegations(address);
      commit("setDelegations", response.data.result);
    } catch (error) {
      throw error;
    }
  },
  /**
   * Action to fetch account's membership
   * 
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchMembership({ commit }, address) {
    try {
      const response = await api.requestMembership(address);
      commit("setMembership", response.data.result);
    } catch (error) {
      commit("setMembership", "");
    }
  },
  /**
   * Action to fetch account's rewards
   * 
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchRewards({
    commit
  }, address) {
    try {
      const response = await api.requestRewards(address);
      commit("setRewards", response.data.result);
    } catch (error) {
      throw error;
    }
  },
  /**
   * Action to fetch account's unbonding delegations
   * 
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchUnbondingDelegations({
    commit
  }, address) {
    try {
      const response = await api.requestUnbondingDelegations(address);
      commit("setUnbondingDelegations", response.data.result);
    } catch (error) {
      throw error;
    }
  },
};
