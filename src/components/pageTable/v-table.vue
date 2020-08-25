<template>
    <div class="v-table container">
        <div class="row">
            <div class="col-md-12">
                <div class="v-table--show-and-search">
                    <v-select></v-select> <!-- SELECT -->
                    <v-search></v-search> <!-- SEARCH -->
                </div>
            </div>
            <div class="col-md-12 table-responsive">
                <table class="table table-striped">
                    <tr class="v-table--header">
                        <th><input type="checkbox" v-model="allChecked"/></th>
                        <th v-for="column in columns" :key="column.id"
                            :class="[{'table-active': currentSort[0] === column.slug}, {'cursor-pointer': column.slug}]"
                            @click="changeSort(column)">
                            <div class="head-inner">
                                <span>{{ column.title }}</span>
                                <div v-if="column.slug" class="sort-arrows">
                  <span
                      :class="['glyphicon glyphicon-chevron-up', currentSort[0] === column.slug && currentSort[1] === 'asc' ? 'icon-active' : '']"
                      aria-hidden="true"/>
                                    <span
                                        :class="['glyphicon glyphicon-chevron-down', currentSort[0] === column.slug && currentSort[1] === 'desc' ? 'icon-active' : '']"
                                        aria-hidden="true"/>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tbody>
                    <tr v-for="row in USERS" :key="row.id">
                        <th>
                            <input type="checkbox" :checked="allChecked"/>
                        </th>
                        <th>{{ row.id }}</th>
                        <th>{{ row.createdAt }}</th>
                        <th>{{ row.email }}</th>
                        <th>{{ row.name }}</th>
                        <th>{{ row.age }}</th>
                        <th>{{ row.country }}</th>
                        <th>
                            <div>
                                <button
                                    type="button"
                                    v-if="row.approved == false"
                                    :class="['btn btn-custom btn-xs', row.approved == false ? 'btn-success' : 'btn-danger']"
                                    @click="approvedChange(row)"
                                >
                                    approve
                                </button>
                                <button
                                    type="button"
                                    v-else
                                    :class="['btn btn-custom btn-xs', row.approved == false ? 'btn-success' : 'btn-danger']"
                                    @click="approvedChange(row)"
                                >
                                    disapprove
                                </button>
                            </div>
                        </th>
                    </tr>
                    </tbody>
                    <tr class="v-table--header">
                        <th></th>
                        <th v-for="column in columns" :key="column.id"
                            :class="[{'table-active': currentSort[0] === column.slug}, {'cursor-pointer': column.slug}]"
                            @click="changeSort(column)">
                            <div class="head-inner">
                                <span>{{ column.title }}</span>
                                <div v-if="column.slug" class="sort-arrows">
                  <span
                      :class="['glyphicon glyphicon-chevron-up', currentSort[0] === column.slug && currentSort[1] === 'asc' ? 'icon-active' : '']"
                      aria-hidden="true"/>
                                    <span
                                        :class="['glyphicon glyphicon-chevron-down', currentSort[0] === column.slug && currentSort[1] === 'desc' ? 'icon-active' : '']"
                                        aria-hidden="true"/>
                                </div>
                            </div>
                        </th>
                    </tr>
                </table>
            </div>
            <v-pagination></v-pagination> <!-- PAGINATION -->
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import store from '@/store/index'
import vSelect from "@/components/pageTable/v-select";
import vSearch from "@/components/pageTable/v-search";
import vPagination from "@/components/pageTable/v-pagination";

export default {
    name: "v-table",
    components: {
        vSelect,
        vSearch,
        vPagination,
    },
    data() {
        return {
            columns: [
                {title: 'Id', slug: 'id'},
                {title: 'CreatedAt', slug: 'createdAt'},
                {title: 'Email', slug: 'email'},
                {title: 'Name', slug: 'name'},
                {title: 'Age', slug: 'age'},
                {title: 'Country', slug: 'country'},
                {title: 'Approved', slug: 'approved'}
            ],
            allChecked: false,
        };
    },
    methods: {
        // sort
        changeSort(sort) {
            if (!sort.slug) return;
            if (sort.slug === this.currentSort[0]) {
                this.currentSort = [this.currentSort[0], this.currentSort[1] === 'desc' ? 'asc' : 'desc'];
            } else {
                this.currentSort = [sort.slug, 'asc'];
            }
        },
        approvedChange(row) {
            row.approved = !row.approved
            store.dispatch('GET_APPROVED_CHECK', row)
        },
        /*checkedChange(row) {
          row.checked = !row.checked
          store.dispatch('GET_CHECKBOX_CHECK', row)
        },*/
    },
    computed: {
        ...mapGetters(["USERS"]),
        currentSort: {
            get() {
                return store.state.currentSort
            },
            set(sort) {
                store.dispatch('GET_CURRENT_SORT', sort)
            }
        },
    },
};
</script>

<style>
.v-table__header th {
    cursor: pointer;
    padding: 8px;
    vertical-align: middle;
    text-align: start;
}

.v-table--show-and-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.v-table--show-and-search__select {
    display: inline-flex;
    width: 300px;
    justify-content: space-between;
    align-items: center;
}

.v-table--show-and-search__select select {
    margin: 0 8px 0 8px;
}

.v-table--show-and-search__search label {
    margin-right: 8px;
}

.v-table--pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination li {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
}

.pagination li:hover {
    background-color: antiquewhite;
}

/* sort styles */
.cursor-pointer {
    cursor: pointer;
}

.v-table--header th {
    padding: 8px;
}

.head-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.sort-arrows {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
}

.sort-arrows span {
    color: #3333;
}

.icon-active {
    color: red !important;
}

.btn-custom {
    border: none;
    padding: 4px 10px;
    transition: all .2s;
}

.btn-custom:focus {
    border: none;
    outline: none;
}

</style>