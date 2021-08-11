<template>
  <router-view />
</template>

<script>
// import { auth } from "./firebase";
export default {
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
  background: rgb(250,250,250);

}

</style>
