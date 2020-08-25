<template>
    <div id="app">
        <v-table></v-table>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import vTable from "./components/pageTable/v-table";

export default {
    name: "App",
    components: {
        vTable,
    },
    data: () => {
        return {};
    },
    methods: {
        ...mapActions(["GET_USERS_FROM_API"]),

    },
    computed: {},
    async created() {
        await this.GET_USERS_FROM_API();
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
