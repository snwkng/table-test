<template>
  <div id="app">
    <v-table 
      :users_data="USERS" 
      @sendPage="sendPage"
      @usersPerPage="usersPerPage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vTable from "./components/table/v-table";

export default {
  name: "App",
  components: {
    vTable,
  },
  data: () => {
    return {
      pageNumber: 1,
      usersPage: 10
    };
  },
  methods: {
    ...mapActions(["GET_USERS_FROM_API", "GET_USERS_PAGE"]),
    sendPage(value) {
      console.log("PageClick: " + value)
      this.pageNumber = value
      this.GET_USERS_PAGE({
        pageNumber: this.pageNumber,
        usersPage: this.usersPage
      });
    },
    usersPerPage(value) {
      console.log("usersPerPage: " + value)
      this.usersPage = value
      this.GET_USERS_PAGE({
        pageNumber: this.pageNumber,
        usersPage: this.usersPage
      });
    }
  },
  computed: {
    ...mapGetters(["USERS"]),

  },
  async mounted() {
    this.GET_USERS_FROM_API();
    //this.GET_USERS_PAGE(this.pageNumber);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
