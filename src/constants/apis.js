const LCD = process.env.VUE_APP_LCD || '';

const API_VERSION = process.env.VUE_APP_API_VERSION || '';

const API_PATHS = {
  BASE: 'base',
  COMMERCIO: 'commercionetwork',
  COSMOS: 'cosmos',
  TENDERMINT: 'tendermint',
  TX: 'tx',
};

const WS = process.env.VUE_APP_WS || '';

const BACKEND = process.env.VUE_APP_BACKEND || '';
const BACKEND_VERSION = process.env.VUE_APP_BACKEND_API_VERSION || '';
const BACKEND_WS = process.env.VUE_APP_BACKEND_WS || '';

const KEYBASE_API = `https://keybase.io/_/api`;
const KEYBASE_VERSION = '1.0';

export const APIS = {
  HTTP: {
    LCD: LCD,
    API_VERSION: API_VERSION,
    BACKEND: `${BACKEND}/${BACKEND_VERSION}`,
    // Query
    AUTH: `${LCD}/${API_PATHS.COSMOS}/auth/${API_VERSION}`,
    BANK: `${LCD}/${API_PATHS.COSMOS}/bank/${API_VERSION}`,
    DISTRIBUTION: `${LCD}/${API_PATHS.COSMOS}/distribution/${API_VERSION}`,
    GOVERNANCE: `${LCD}/${API_PATHS.COSMOS}/gov/${API_VERSION}`,
    STAKING: `${LCD}/${API_PATHS.COSMOS}/staking/${API_VERSION}`,
    // Service
    BLOCKS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/blocks`,
    NODE_INFO: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/node_info`,
    VALIDATORSETS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/validatorsets`,
    TXS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.TX}/${API_VERSION}`,
    // Commercio
    KYC: `${LCD}/${API_PATHS.COMMERCIO}/commerciokyc`,
    MINT: `${LCD}/${API_PATHS.COMMERCIO}/commerciomint`,
    SUPPLY: `${LCD}/${API_PATHS.COMMERCIO}/supply`,
    VBR: `${LCD}/${API_PATHS.COMMERCIO}/vbr`,
    // RPC
    BLOCKS_RPC: `${LCD}/blocks`,
    VALIDATORSETS_RPC: `${LCD}/validatorsets`,
    // Keybase
    KEYBASE: `${KEYBASE_API}/${KEYBASE_VERSION}`,
  },
  SORTING_ORDERS: {
    ORDER_BY_ASC: 'ORDER_BY_ASC',
    ORDER_BY_DESC: 'ORDER_BY_DESC',
    ORDER_BY_UNSPECIFIED: 'ORDER_BY_UNSPECIFIED',
  },
  WS: {
    EVENTS: {
      NEW_BLOCK: 'NewBlock',
      TX: 'Tx',
      TX_SET_PARAMS: 'setParams',
      VALIDATOR_SET_UPDATES: 'ValidatorSetUpdates',
    },
    URL: WS,
    URL_BACKEND: BACKEND_WS,
  },
};
