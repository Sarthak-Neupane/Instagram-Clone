<template>
  <div>
    <h1>This is your feed page</h1>
    <router-link :to="getPath"> profile</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    getPath() {
      return `/profile`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
