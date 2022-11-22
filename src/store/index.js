import Vue from 'vue';
import Vuex from 'vuex';

import account from './account';
import accountBalance from './account-balance';
import application from './application';
import blocks from './blocks';
import exchangeRate from './exchange-rate';
import home from './home';
import keplr from './keplr';
import proposals from './proposals';
import stats from './stats';
import transactions from './transactions';
import validators from './validators';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    account,
    accountBalance,
    application,
    blocks,
    exchangeRate,
    home,
    keplr,
    proposals,
    stats,
    transactions,
    validators,
  },
});
