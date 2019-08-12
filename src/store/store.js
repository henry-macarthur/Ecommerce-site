import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import {resolve} from 'url'

Vue.use(Vuex);

const state = {
    token: '',
    id: ''
}

const getters = {
    getToken: state =>  state.token
}

const mutations = {
    set (state, {token}) {
        state.token = payload;
    }
}

export default new Vuex.Store({
    state, 
    getters,
    mutations,
    plugins: [
        createPersistedState({
          //paths: ["auth"],
          storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) =>
              Cookies.set(key, value, { expires: 3, secure: true }),
            removeItem: key => Cookies.remove(key)
          }
        })
      ]
})
// const actions = {
//     set: ({commit}, {token})
// }