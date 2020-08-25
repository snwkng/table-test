export default {
    SET_USERS_TO_VUEX: (state, users) => {
        state.users = users
    },
    SET_CURRENT_PAGE: (state, payload) => {
        state.currentPage = payload
    },
    SET_USERS_PER_PAGE: (state, payload) => {
        state.limitPerPage = payload
    },
    SET_SEARCH_KEYWORD: (state, payload) => {
        state.searchKeyword = payload
    },
    SET_CURRENT_SORT: (state, payload) => {
        state.currentSort = payload
    },
    SET_APPROVED_CHECK: (state, payload) => {
        state.users.data = payload
    },
}