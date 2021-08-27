<template>
 <teleport to="body">
    <base-dialog
      v-if="error"
      @close-dialog="close"
      mode="red"
      circleMode="circleRed"
    >
      <template #title>Aww Snap! Please Try Again. </template>
      <template #main> {{ error }} </template>
    </base-dialog>

    <base-spinner v-if="loading"></base-spinner>
  </teleport>
  <div class="grid" v-if="!loading">
    <img :src="goal.file" v-for="goal in goals" :key="goal.file" alt="">
  </div>
</template>

<script>
export default {
  props: ['id'],
  data(){
    return {
      goals : null,
      loading: null,
      error: null,
    }
  },
  methods:{
    async getPhotos(n){
      this.loading = true
      try {
      const hello = await this.$store.dispatch('database/getPhoto', n.params.id)
      this.goals = hello.goals
      } catch (error) {
        this.error = error.message
      }
      this.loading = false
    }
  },
  created(){
    this.getPhotos(this.$route)
  },
    watch:{
    $route(n){
      this.getPhotos(n)
    }
  },
};
</script>

<style scoped lang="scss">
.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  img {
    width: 30vw;
    height: 30vw;
    max-width: 288px;
    max-height: 288px;
    object-fit: cover;
    margin: 1rem;

    @media screen and (max-width: 1000px) {
      margin: .5rem;
    }
    @media screen and (max-width: 500px) {
      margin: .2rem;
    }
  }
}
</style>