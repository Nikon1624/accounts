import {HTTP} from '@/consts';

export default {
    namespaced: true,
    state: {
        accounts: [],
        accountsActions: null
    },
    getters: {
        accounts(state) {
            return state.accounts.sort((accountA, accountB) => accountB.id - accountA.id);
        },
        accountsActions(state) {
            return state.accountsActions;
        }
    },
    mutations: {
        setAccounts(state, accounts) {
            state.accounts = accounts;
        },
        removeAccount(state, id) {
            state.accounts = state.accounts.filter((account) => {
                if (account.id !== id) {
                    return account;
                }
            });
        },
        setAccountsActions(state, actions) {
            state.accountsActions = actions;
        }
    },
    actions: {
        fetchAccounts({commit}) {
            HTTP.get('api/bank/account/')
                .then((response) => {
                    if (response.status === 200) {
                        commit('setAccounts', response.data);
                    }
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
        createAccount({dispatch}) {
            HTTP.post('api/bank/account/')
                .then(() =>  dispatch('fetchAccounts'))
                .catch((err) => {
                    throw new Error(err)
                });
        },
        deleteAccount({commit}, {id}) {
            HTTP.delete(`/api/bank/account/${id}/`)
                .then(() => commit('removeAccount', id))
                .catch((err) => {
                    throw new Error(err)
                });
        },
        upAccount({dispatch}, data) {
            HTTP.post('/api/bank/action/', data)
                .then(() => dispatch('fetchAccounts'))
                .catch((err) => {
                    throw new Error(err)
                });
        },
        spendAccount({dispatch}, data) {
            HTTP.post('/api/bank/transaction/', data)
                .then(() => dispatch('fetchAccounts'))
                .catch((err) => {
                    throw new Error(err)
                });
        },
        getAccountUppers() {
            return HTTP.get('/api/bank/action/')
                .catch((err) => {
                    throw new Error(err)
                });
        },
        getAccountTransactions() {
            return HTTP.get('/api/bank/transaction/')
                .catch((err) => {
                    throw new Error(err)
                });
        },
        async getAccountsActions({dispatch, commit}) {
            const uppers = await dispatch('getAccountUppers');
            const transactions = await dispatch('getAccountTransactions');

            return new Promise((resolve) => {
                commit('setAccountsActions', {
                    uppers: uppers.data,
                    transactions: transactions.data
                });
                resolve();
            });
        }
    }
}