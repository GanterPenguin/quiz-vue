"use strict";

import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: modules,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
});
