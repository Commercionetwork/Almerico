import actions from '../actions.js';
import { STATUS } from '@/constants';
import { mockValidatorDelegations } from '../__mocks__/validator_delegations';
import { mockValidatorSets } from '../__mocks__/validator_sets';
import { mockValidators, mockValidator } from '../__mocks__/validators';

const mockErrorResponse = {
  request: {},
  response: {
    data: {
      error: 'error',
    },
    status: 400,
  },
};
const mockErrorRequestResponse = {
  request: {},
  response: undefined,
};

let mockError = false;
let mockErrorRequest = false;
let mockErrorServer = false;
let mockResponse = null;

describe('store/validators/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  test("Check if 'actions.fetchLatestValidatorSets' get latest validator sets", async () => {
    const commit = jest.fn();

    await actions.fetchLatestValidatorSets({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setLatestValidatorsSets',
      mockResponse.data.result.validators
    );
  });

  test("Check if 'actions.fetchValidatorsList' add validators by status", async () => {
    const commit = jest.fn();
    const status = STATUS.VALIDATOR.BONDED;
    const page = 1;
    const limit = 30;

    await actions.fetchValidatorsList(
      { commit },
      { status: status, page: page, limit: limit }
    );

    expect(commit).toHaveBeenCalledWith(
      'addValidators',
      mockResponse.data.result
    );
  });

  test("Check if 'actions.initValidators' get latest validator sets and all validators by status", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const status = [
      STATUS.VALIDATOR.BONDED,
      STATUS.VALIDATOR.UNBONDED,
      STATUS.VALIDATOR.UNBONDING,
    ];
    const page = 1;
    const limit = 30;

    await actions.initValidators(
      { commit, dispatch },
      { status: status, page: page, limit: limit }
    );

    expect(dispatch).toHaveBeenCalledWith('fetchLatestValidatorSets');
    expect(dispatch).toHaveBeenCalledWith('fetchValidatorsList', {
      status: STATUS.VALIDATOR.BONDED,
      page: page,
      limit: limit,
    });
    expect(dispatch).toHaveBeenCalledWith('fetchValidatorsList', {
      status: STATUS.VALIDATOR.UNBONDED,
      page: page,
      limit: limit,
    });
    expect(dispatch).toHaveBeenCalledWith('fetchValidatorsList', {
      status: STATUS.VALIDATOR.UNBONDING,
      page: page,
      limit: limit,
    });
  });

  test("Check if 'actions.fetchValidatorsetsFromHeight' set validator sets", async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchValidatorsetsFromHeight({ dispatch, commit }, 1);

    expect(commit).toHaveBeenCalledWith(
      'setHeightValidatorsSets',
      mockResponse.data.result.validators
    );
  });

  test("Check if 'actions.setValidatorsFilter' set filter", () => {
    const commit = jest.fn();
    const filter = {};

    actions.setValidatorsFilter({ commit }, filter);

    expect(commit).toHaveBeenCalledWith('setFilter', filter);
  });

  test("Check if 'actions.fetchValidatorDetails' set validator details", async () => {
    const commit = jest.fn();

    await actions.fetchValidatorDetails({ commit }, 'address');

    expect(commit).toHaveBeenCalledWith('setDetails', mockResponse.data.result);
  });

  test("Check if 'actions.fetchValidatorDelegations' add delegations validator details", async () => {
    const commit = jest.fn();

    await actions.fetchValidatorDelegations({ commit }, 'address');

    expect(commit).toHaveBeenCalledWith('addDetails', {
      delegations: mockResponse.data.result,
    });
  });

  test("Check if 'actions.getValidatorData' set details and delegations", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = {};
    const address = 'address';

    await actions.getValidatorData(
      {
        commit,
        dispatch,
        state,
      },
      { address: address }
    );

    expect(dispatch).toHaveBeenCalledWith('fetchValidatorDetails', address);
    expect(dispatch).toHaveBeenCalledWith('fetchValidatorDelegations', address);
  });

  test("if 'actions.handleError' handles the various types of error", () => {
    const commit = jest.fn();
    let error = mockErrorResponse;

    actions.handleError({ commit }, error);

    expect(commit).toBeCalledWith('setError', error.response);

    error = mockErrorRequestResponse;

    actions.handleError({ commit }, error);

    expect(commit).toBeCalledWith('setError', error);

    error = 'error';

    actions.handleError({ commit }, error);

    expect(commit).toBeCalledWith('setServerReachability', false, {
      root: true,
    });
  });
});

jest.mock('./../api', () => ({
  requestValidatorsList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockValidators(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestLatestValidatorSets: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockValidatorSets(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorsetsFromHeight: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockValidatorSets(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorDetails: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockValidator(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorDelegations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockValidatorDelegations(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
