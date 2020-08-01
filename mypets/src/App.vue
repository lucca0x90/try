<template>
  <div id="app">
    <div id="nav">
      <b-nav tabs justified>
        <b-nav-item to="/" :active="pageActive === 'Home'">Home</b-nav-item>
        <b-nav-item to="/cats" :active="pageActive === 'Cats'">Cats</b-nav-item>
        <b-nav-item to="/dogs" :active="pageActive === 'Dogs'">Dogs</b-nav-item>
      </b-nav>
    </div>
    <b-container>
        <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            pageActive: undefined,
        }
    },
    mounted() {
        this.active();
        },
    watch: {
        $route: function(newRoute) {
            this.pageActive = newRoute.name;
        }
    },
    methods: {
        active() {
            this.pageActive = this.$route.name;
        }

    }
}
</script>

<style scoped>
#app {
    margin-top: 30px;
    text-align: center;
}
</style>
