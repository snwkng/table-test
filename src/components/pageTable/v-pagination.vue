<template>
    <!-- ПАГИНАЦИЯ -->
    <div class="col-md-12">
        <div class="v-table--pagination">
            <div
                class="v-table--pagination__showing-items"
            >Showing {{ this.currentPage }} to {{ paginationPages }} of {{ this.TOTAL_USERS }} entries
            </div>
            <nav>
                <ul class="pagination" v-for="page in paginationPages" :key="page">
                    <li @click="pageClick(page)" :class="{'active': page === currentPage}">
                        <span>{{ page }}</span>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
import store from "@/store"
export default {
    name: "v-pagination",
    methods: {
        pageClick(page) {
            this.currentPage = page
        },
    },
    computed: {
        ...mapGetters(["USERS", "CURRENT_PAGE", "TOTAL_USERS"]),
        paginationPages() {
            if (
                !this.USERS.length ||
                Number.isNaN(parseInt(this.TOTAL_USERS)) ||
                Number.isNaN(this.USERS.length) ||
                this.USERS <= 0
            ) {
                return 0;
            }
            const result = Math.ceil(this.TOTAL_USERS / this.USERS.length)
            return (result < 1) ? 1 : result
        },
        currentPage: {
            get() {
                return store.state.currentPage
            },
            set(page) {
                store.dispatch('GET_CURRENT_PAGE', page)
            }
        },
    }
}
</script>

<style scoped>

</style>