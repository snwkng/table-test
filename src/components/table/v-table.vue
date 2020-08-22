<template>
  <div class="v-table container">
    <div class="row">
      <div class="col-md-12">
        <div class="v-table--show-and-search">
          <div class="v-table--show-and-search__select">
            Show
            <select class="form-control" v-model="usersPerPage" @change="defaultPage()">
              <option value="10" selected>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
          </div>
          <div class="v-table--show-and-search__search">
            <form class="form-inline">
              <div class="form-group">
                <label for="search">Search</label>
                <input type="text" class="form-control" id="search" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-12 table-responsive">
        <table class="table table-striped">
          <tr class="v-table__header">
            <th @click="sortByUserId">id</th>
            <th @click="sortByUserCreatedAt">createdAt</th>
            <th @click="sortByUserEmail">email</th>
            <th @click="sortByUserName">name</th>
            <th @click="sortByUserAge">age</th>
            <th @click="sortByUserCountry">country</th>
            <th>approved</th>
          </tr>
          <tbody>
            <tr v-for="row in users_data" :key="row.id">
              <th>{{row.id}}</th>
              <th>{{row.createdAt}}</th>
              <th>{{row.email}}</th>
              <th>{{row.name}}</th>
              <th>{{row.age}}</th>
              <th>{{row.country}}</th>
              <th>{{row.approved}}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- ПАГИНАЦИЯ -->
      <div class="col-md-12">
        <div class="v-table--pagination">
          <div
            class="v-table--pagination__showing-items"
          >Showing 1 to 10 of {{this.users_data.length}} entries</div>
          <nav>
            <ul class="pagination" v-for="page in paginationPages" :key="page">
              <li @click="pageClick(page)" :class="{'active': page === pageNumber}">
                <span>{{page}}</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-table",
  props: {
    users_data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      usersPerPage: 10,
      pageNumber: 1,
    };
  },
  methods: {
    pageClick(page) {
      this.pageNumber = page;
      this.$emit('sendPage', this.pageNumber)
    },
    defaultPage() {
      this.pageNumber = 1;
    },
    sortByUserId() {
      this.users_data.sort((a, b) => a.id - b.id);
    },
    sortByUserCreatedAt() {
      this.users_data.sort((a,b) => a.createdAt.localeCompare(b.createdAt));
    },
    sortByUserEmail() {
      this.users_data.sort((a, b) => a.email.localeCompare(b.email));
    },
    sortByUserName() {
      this.users_data.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortByUserAge() {
      this.users_data.sort((a, b) => a.age - b.age);
    },
    sortByUserCountry() {
      this.users_data.sort((a, b) => a.country.localeCompare(b.country));
    },
  },
  computed: {
    paginationPages() {
      // return Math.ceil(this.users_data.length / this.usersPerPage);
      return Math.ceil(this.users_data.length);
    },
    /* paginatedUsers() {
      let from = (this.pageNumber - 1) * this.usersPerPage;
      let to = from + Number(this.usersPerPage);
      return this.users_data.slice(from, to);
    }, */
  },
};
</script>

<style>
.v-table__header {
  border-bottom: 2px solid #333;
}
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
  margin: 0px 8px 0px 8px;
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
</style>