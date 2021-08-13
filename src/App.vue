<template>
  <!-- <Header /> -->
  <Header v-if="!$route.meta.hideNavbar"></Header>
  <router-view />
</template>

<script>
// import { auth } from "./firebase";
import Header from './components/Navbar.vue'
export default {
  components:{
    Header
  },
  created() {
    // console.log(auth);
  },
};
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fafafa;

}

</style>
