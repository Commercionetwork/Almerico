import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import ValidatorsDetail from '../ValidatorsDetail.vue';

Vue.use(Vuetify);
Vue.use(Vuex);

const localVue = createLocalVue();

describe('views/validators/ValidatorsDetail.vue', () => {
  const actions = {
    initValidatorsDetail: jest.fn(),
  };
  const mockStore = new Vuex.Store({
    modules: {
      validators: {
        namespaced: true,
        actions,
      },
    },
  });
  const mocks = {
    $store: mockStore,
    $t: (msg) => msg,
  };
  const computed = {
    account: () => 'account',
    address: () => 'address',
    lastHeight: () => '1',
    newHeight: () => '2',
  };

  test('if loading indicator is displayed', () => {
    const wrapper = shallowMount(ValidatorsDetail, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => true,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if message error is displayed', () => {
    const error = Error('message');
    const wrapper = shallowMount(ValidatorsDetail, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => error,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false);
  });

  test('if content is displayed', () => {
    const wrapper = shallowMount(ValidatorsDetail, {
      localVue,
      mocks,
      computed: {
        ...computed,
        error: () => null,
        isLoading: () => false,
      },
    });

    expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="error"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true);
  });
});
