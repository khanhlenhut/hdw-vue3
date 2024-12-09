<template>
  <nav-view></nav-view>
  <router-view></router-view>
</template>

<script>
import NavView from "./components/NavView.vue";
export default {
  name: "App",
  components: {
    NavView: NavView,
  },
};
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  // -webkit-font-smoothing: antialiased
  // -moz-osx-font-smoothing: grayscale
  // text-align: center
  // color: #2c3e50
  // margin-top: 60px
</style>
