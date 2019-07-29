/* global describe, expect, it, jest */

import TransactionDetails from "../TransactionDetails.vue";
import {
  mockTransaction
} from "Store/transactions/__mocks__/transactions";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";

const localVue = createLocalVue();

describe("views/transactions/TransactionDetails.vue", () => {
  const methods = {
    getTransaction: jest.fn()
  };
  const mocks = {
    $route: {
      params: {
        id: "1"
      }
    },
    $t: messageId => messageId
  };

  it("Check if loading message is displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transaction_details: {
            msgs_details: true
          }
        }
      }
    });
    wrapper.setData({
      isFetching: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="loading"]').text()).toEqual('messages.loading');
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if error message is displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transaction_details: {
            msgs_details: true
          }
        }
      }
    });
    wrapper.setData({
      isFetching: false,
      hasError: true
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="has-error"]').text()).toEqual('messages.fetchingError');
    expect(wrapper.find('[data-test="item"]').exists()).toBe(false);
  });

  it("Check if item data are displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transaction_details: {
            msgs_details: true
          }
        }
      }
    });
    wrapper.setData({
      isFetching: false,
      transaction: mockTransaction()
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="has-error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="item"]').exists()).toBe(true);
  });

  it("Check if transaction messages are displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transaction_details: {
            msgs_details: true
          }
        }
      }
    });
    wrapper.setData({
      isFetching: false,
      transaction: mockTransaction()
    });

    expect(wrapper.find('[data-test="msgs-details"]').exists()).toBe(true);
  });

  it("Check if transaction messages are not displayed", () => {
    const wrapper = shallowMount(TransactionDetails, {
      localVue,
      methods,
      mocks: {
        ...mocks,
        $config: {
          transaction_details: {
            msgs_details: false
          }
        }
      }
    });
    wrapper.setData({
      isFetching: false,
      transaction: mockTransaction()
    });

    expect(wrapper.find('[data-test="msgs-details"]').exists()).toBe(false);
  });
});
