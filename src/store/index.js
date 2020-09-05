import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import accounts from '@/store/modules/accounts';

export default new Vuex.Store({
    modules: {
        accounts,
    }
});