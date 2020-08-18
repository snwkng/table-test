import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store( {
  state: {
    users: []
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
    async GET_USERS_FROM_API(ctx, pageNumber = 1) {
      const res = await fetch(
        'https://5f36a62dbbfd1e00160beb4b.mockapi.io/users?page=' + pageNumber + '&limit=100'
      )
      const setUsers = await res.json()

      ctx.commit('SET_USERS_TO_VUEX', setUsers)
    }

  },
  mutations: {
    SET_USERS_TO_VUEX: (state, users) => {
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