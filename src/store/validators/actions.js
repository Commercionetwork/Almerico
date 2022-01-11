import { staking, tendermintRpc } from '@/apis/http';
import { SETTINGS, VALIDATORS } from '@/constants';

export default {
  async initValidatorsList({ commit, dispatch }, lastHeight) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchPool')];
    if (process.env.VUE_APP_BLOCKS_MONITOR === 'true') {
      requests.push(dispatch('fetchTrackedBlocks', lastHeight));
    }
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchPool({ commit, dispatch }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchTrackedBlocks({ dispatch }, lastHeight) {
    const requests = setUpBlocksRequests(dispatch, lastHeight);
    await Promise.all(requests);
  },

  async addBlocksItem({ commit, dispatch }, height) {
    try {
      const resBlock = await tendermintRpc.requestBlock(height);
      const resValidatorSets = await tendermintRpc.requestValidatorSets(height);
      commit('addBlock', { ...resBlock.data, ...resValidatorSets.data.result });
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async initValidatorsDetail({ commit, dispatch }, { id, lastHeight }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchDetail', id),
      dispatch('fetchDetailDelegations', id),
      dispatch('fetchPool'),
    ];
    if (process.env.VUE_APP_BLOCKS_MONITOR === 'true') {
      requests.push(dispatch('fetchTrackedBlocks', lastHeight));
    }
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchDetail({ commit, dispatch }, id) {
    try {
      const response = await staking.requestValidatorsDetailLegacy(id);
      commit('setDetail', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchDetailDelegations({ dispatch, getters }, id) {
    await dispatch('addDetailDelegations', { id });
    while (getters['delegationsTotal'] > getters['delegationsOffset']) {
      await dispatch('addDetailDelegations', {
        id,
        offset: getters['delegationsOffset'],
      });
    }
  },

  async addDetailDelegations({ commit, dispatch }, { id, offset }) {
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await staking.requestValidatorsDetailDelegations(
        id,
        pagination,
      );
      commit('addDelegations', response.data.delegation_responses);
      commit('setDelegationsPagination', response.data.pagination);
      commit('sumDelegationsOffset', response.data.delegation_responses.length);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  handleError({ commit }, error) {
    commit('setError', error);
  },

  setValidatorsFilter({ commit }, filter) {
    commit('setFilter', filter);
  },
};

const getMinHeight = ({ height, items, firstHeight }) =>
  height - items < firstHeight ? firstHeight : height - items;

const setUpBlocksRequests = (dispatch, lastHeight) => {
  let height = parseInt(lastHeight);
  const minHeight = getMinHeight({
    height: height,
    items: VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT,
    firstHeight: SETTINGS.FIRST_HEIGHT,
  });
  const requests = [];
  while (height > minHeight) {
    requests.push(dispatch('addBlocksItem', height--));
  }
  return requests;
};
