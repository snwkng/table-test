<template>
    <div class="v-table--show-and-search__select">
        Show
        <select class="form-control" v-model="limitPerPage">
            <option value="10" selected>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
        </select>
        entries
    </div>
</template>

<script>
import {mapGetters} from "vuex"
import store from '@/store/index'
export default {
    name: "v-select",
    computed: {
        ...mapGetters(["LIMIT_PER_PAGE"]),
        limitPerPage: {
            get() {
                return store.state.limitPerPage
            },
            set(limit) {
                store.dispatch('GET_USERS_PER_PAGE', limit)
            }
        },
    }

}
</script>

<style scoped>

</style>