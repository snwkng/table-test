<template>
    <div class="v-table--show-and-search__search">
        <form class="form-inline" @submit.prevent="searchKeyword">
            <div class="form-group">
                <label for="search">Search</label>
                <input type="text" class="form-control" id="search" v-model="searchKeyword"/>
            </div>
        </form>
    </div>
</template>

<script>
import store from "@/store";
export default {
    name: "v-search",
    computed: {
        searchKeyword: {
            get() {
                return store.state.searchKeyword
            },
            set(keyword) {
                store.dispatch('GET_SEARCH_KEYWORD', keyword)
            }
        },
    }

}
</script>

<style scoped>

</style>