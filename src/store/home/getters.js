export default {
  abrTokens: (state) => state.abrTokens,
  error: (state) => state.error,
  freezedTokens: (state) => state.freezedTokens,
  isLoading: (state) => state.isLoading,
  isLoadingTxs: (state) => state.isLoadingTxs,
  conversionRate: (state) =>
    state.params ? parseFloat(state.params.conversion_rate) : 1,
  paramsUpdates: (state) => state.paramsUpdates,
  paramsUpdatesOffset: (state) => state.paramsUpdatesOffset,
  paramsUpdatesPagination: (state) => state.paramsUpdatesPagination,
  paramsUpdatesTotal: (state) => state.paramsUpdatesPagination.total,
  pool: (state) => state.pool,
  startingDate: (state) => state.startingDate,
  supply: (state) => state.supply,
  transactions: (state) => state.transactions,
  txEventHeight: (state) => state.txEventHeight,
  vbrTokens: (state) => state.vbrTokens,
};
