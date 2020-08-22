import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [],
  },
  actions: {
    /*GET_USERS_FROM_API({commit}, pageNumber = 1, limit = 10) {
      return axios('https://5f36a62dbbfd1e00160beb4b.mockapi.io/users?page=' + pageNumber + '&limit=' + limit, {
        method: 'GET'
      })
        .then((response) => {
          commit('SET_USERS_TO_VUEX', response.data)
        })
    }*/
    async GET_USERS_FROM_API({commit}) {
      await Axios.get(
        'https://5f36a62dbbfd1e00160beb4b.mockapi.io/users?page=1&limit=10'
      ).then((res) => { commit('SET_USERS_TO_VUEX', res.data) })
    },
     async GET_USERS_PAGE({commit}, payload) {
      await Axios.get(
        'https://5f36a62dbbfd1e00160beb4b.mockapi.io/users?page=' + payload + "&limit=10"
      ).then((res) => { commit('SET_USERS_TO_VUEX', res.data) })
    } 

  },
  mutations: {
    SET_USERS_TO_VUEX: (state, users) => {
      state.users = users
    },
     SET_USERS_PAGE: (state, users) => {
      state.users = users
    } 
  },
  getters: {
    USERS(state) {
      return state.users;
    }
  }
})

export default store;