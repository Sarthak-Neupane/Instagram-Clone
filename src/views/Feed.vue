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
      const userAccount = this.$store.getters["auth/get_the_user"].uid;
      return `/${userAccount}/profile`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
