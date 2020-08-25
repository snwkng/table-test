import Axios from 'axios'

export default {
    async GET_USERS_FROM_API({commit, state}) {
        await Axios.get(
            'https://5f36a62dbbfd1e00160beb4b.mockapi.io/users', {
                params: {
                    page: state.currentPage,
                    limit: state.limitPerPage,
                    search: state.searchKeyword,
                    sortBy: state.currentSort[0],
                    order: state.currentSort[1],
                }
            }).then((res) => {
            commit('SET_USERS_TO_VUEX', res.data)
        })
    },
    // action for pagination
    GET_CURRENT_PAGE({commit, dispatch}, page) {
        commit('SET_CURRENT_PAGE', page)
        dispatch('GET_USERS_FROM_API')

    },
    // action for limit users page
    GET_USERS_PER_PAGE({commit, dispatch}, limit) {
        commit('SET_CURRENT_PAGE', 1)
        // commit('SET_CURRENT_SORT', ['id', 'asc'])
        commit('SET_USERS_PER_PAGE', limit)
        dispatch('GET_USERS_FROM_API')
    },
    // action for search
    GET_SEARCH_KEYWORD({commit, dispatch}, keyword) {
        commit('SET_CURRENT_PAGE', 1)
        commit('SET_SEARCH_KEYWORD', keyword)
        dispatch('GET_USERS_FROM_API')
    },
    GET_CURRENT_SORT({commit, dispatch}, sort) {
        commit('SET_CURRENT_PAGE', 1)
        commit('SET_CURRENT_SORT', sort)
        dispatch('GET_USERS_FROM_API')
    },
    async GET_APPROVED_CHECK({commit, getters}, approved) {
        await Axios.put('https://5f36a62dbbfd1e00160beb4b.mockapi.io/users/' + approved.id, approved)
            .then((approved) => {
                commit('SET_APPROVED_CHECK', approved.data)
            })
        let allUsers = [getters.users]
        allUsers.find($user => {
            if (approved === $user) {
                $user.approved = approved.approved
                commit('SET_USERS_TO_VUEX', allUsers)
            }
        })
    },
}