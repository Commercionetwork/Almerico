/**
 * Blocks mutations
 */
export default {
  /**
   * Set blocks isFetching state to true
   *
   * @param {BlocksState} state
   */
  startLoading(state) {
    state.isFetching = true;
  },
  /**
   * Set blocks isFetching state to false
   *
   * @param {BlocksState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
};
