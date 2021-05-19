const NAMES = {
  BLOCKS: 'blocks',
  BLOCKS_DASHBOARD: 'blocksDashboard',
  BLOCKS_DETAILS: 'blocksDetails',
  DASHBOARD: 'dashboard',
  NOT_FOUND: 'notFound',
  OVERVIEW: 'overview',
  SERVER_UNREACHABLE: 'serverUnreachable',
  TRANSACTIONS: 'transactions',
  TRANSACTIONS_DASHBOARD: 'transactionsDashboard',
  TRANSACTIONS_DETAILS: 'transactionsDetails',
  VALIDATORS: 'validators',
  VALIDATORS_ACCOUNT: 'validatorsAccount',
  VALIDATORS_DASHBOARD: 'validatorsDashboard',
  VALIDATORS_DETAILS: 'validatorsDetails',
};

const PATHS = {
  BLOCKS: '/blocks',
  BLOCKS_DASHBOARD: 'dashboard',
  BLOCKS_DETAILS: 'block/:id',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
  OVERVIEW: '/overview',
  ROOT: '/',
  SERVER_UNREACHABLE: '/server_unreachable',
  TRANSACTIONS: '/txs',
  TRANSACTIONS_DASHBOARD: 'dashboard',
  TRANSACTIONS_DETAILS: '/tx/:id',
  VALIDATORS: '/validators',
  VALIDATORS_ACCOUNT: 'account/:id',
  VALIDATORS_DASHBOARD: 'dashboard',
  VALIDATORS_DETAILS: 'validator/:id',
};

const TITLES = {
  BLOCKS: 'Blocks',
  BLOCKS_DASHBOARD: 'Blocks dashboard',
  BLOCKS_DETAILS: 'Block details',
  DASHBOARD: 'Dashboard',
  NOT_FOUND: 'Not found',
  OVERVIEW: 'overview',
  SERVER_UNREACHABLE: 'Server unreachable',
  TRANSACTIONS: 'Txs',
  TRANSACTIONS_DASHBOARD: 'Txs dashboard',
  TRANSACTIONS_DETAILS: 'Tx details',
  VALIDATORS: 'Validators',
  VALIDATORS_ACCOUNT: 'Validator account',
  VALIDATORS_DASHBOARD: 'Validators dashboard',
  VALIDATORS_DETAILS: 'Validator details',
};

export const ROUTES = {
  NAMES,
  PATHS,
  TITLES,
};
