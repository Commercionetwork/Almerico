import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import { PROPOSALS } from '@/constants';
import { governance, proposals, staking } from '@/apis/http';

export default {
  async initProposalsList({ commit, dispatch }, status) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchProposals', status)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchProposals({ commit }, status = PROPOSALS.STATUS.UNSPECIFIED) {
    try {
      const response = await proposals.requestList(status);
      commit('setList', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  filterProposals({ commit }, filter) {
    commit('setFilter', filter);
  },

  async initProposalsDetail({ commit, dispatch }, id) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchPool'),
      dispatch('fetchProposalDetail', id),
      dispatch('fetchProposalTally', id),
      dispatch('fetchProposalVotesLegacy', id),
      dispatch('fetchTallyParams'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchPool({ commit }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalDetail({ commit }, id) {
    try {
      const response = await proposals.requestDetail(id);
      commit('setDetail', { proposal: response.data });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalTally({ commit }, id) {
    try {
      const response = await governance.requestTally(id);
      commit('setDetail', { tally: response.data.tally });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalVotes({ commit }, id) {
    try {
      const response = await governance.requestVotes(id);
      commit('setDetail', { votes: response.data.votes });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchTallyParams({ commit }) {
    try {
      const response = await governance.requestTallyParams();
      commit('setTallyParams', response.data.tally_params);
    } catch (error) {
      commit('setError', error);
    }
  },
  async voteProposal(
    { commit, dispatch, rootGetters },
    { voteOption, proposalId, translator, context }
  ) {
    commit('setLoading', true);
    try {
      const isKeplrInitialized = rootGetters['keplr/isInitialized'];
      if (!isKeplrInitialized) {
        await dispatch(
          'keplr/connect',
          { translator, context },
          { root: true }
        );
      }
      const accounts = rootGetters['keplr/accounts'];
      const msg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgVote',
        value: MsgVote.fromPartial({
          proposalId: proposalId,
          voter: accounts[0].address,
          option: voteOption,
        }),
      };
      await dispatch(
        'keplr/signAndBroadcastTransaction',
        { msgs: [msg] },
        {
          root: true,
        }
      );
    } catch (error) {
      commit('setError', error);
    }
    commit('setLoading', false);
  },
  //TODO: remove legacy
  async fetchProposalVotesLegacy({ commit }, id) {
    try {
      const response = await governance.requestVotesLegacy(id);
      commit('setDetail', { votes: response.data.result });
    } catch (error) {
      commit('setError', error);
    }
  },
};
