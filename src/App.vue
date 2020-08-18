<template>
  <div id="app">
    <v-table
      :users_data="USERS"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import vTable from './components/table/v-table'

export default {
  name: 'App',
  components: {
    vTable
  },
  data: () => {
    return {
    }
  },
  methods: {
    ...mapActions([
      'GET_USERS_FROM_API'
    ]),
  },
  computed: {
    ...mapGetters([
      'USERS'
    ])
  },
  async mounted() {
    this.GET_USERS_FROM_API();
  }
}
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
