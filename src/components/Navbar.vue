<template>
  <nav>
    <section>
      <div class="logo">
        <h1><router-link to="/feed"> Goalgram</router-link></h1> 
      </div>

      <div class="search">
        <input class="searchBar" placeholder="Search" type="text" />
      </div>

      <div class="links">
        <router-link to="/feed"><Home /></router-link>
        <router-link to="/saved"><Bookmark /></router-link>
        <router-link to="/inbox"><Message /></router-link>
        <router-link to="/explore"><Compass /></router-link>
        <img @click="changeRoute" v-if="!getUser.photoURL" src="../assets/profile.webp" alt="" />
        <img @click="changeRoute" v-else :src="getUser.photoURL" alt="" />
      </div>
    </section>
  </nav>
</template>

<script>
import Home from "./ICONS/home.vue";
import Bookmark from "./ICONS/bookmark.vue";
import Message from "./ICONS/message.vue";
import Compass from "./ICONS/Compass.vue";
export default {
      computed: {
    getUser() {
      let currentUser = this.$store.getters["auth/get_the_user"];
      if (currentUser) {
        console.log('1')
        return currentUser;
      } else if(localStorage.getItem("User")) {
        console.log('2')
        return JSON.parse(localStorage.getItem("User"));
      } else {
        return ''
      }
    },
    // getWidth() {
    //   return this.width;
    // },
  },
  components: {
    Home,
    Bookmark,
    Message,
    Compass,
  },

  methods:{
    changeRoute(){
      this.$router.push(`/${this.getUser.uid}/profile/goals`)
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  background: white;
  border-bottom: 1px solid #e4e4e4 ;

  section {
    background: white;
    margin: 0 auto;
    width: 100%;
    min-width: 25rem;
    max-width: 70rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: .5rem 1rem;

    @media screen and (max-width: 768px) {
      min-width: 100%;
    }

    .logo{
      vertical-align: middle;
      a{
        text-decoration: none;
        color: black;
        font-family: cursive;
        font-size: 2rem;
        font-weight: 500;
      }
    }

    .search{

        .searchBar{
            background: #fafafa;
            border: 1px solid #e4e4e4;
            outline: none;
            height: 1.7rem;
            width: 15rem;
            padding-left: 1.4rem;
            
        @media  screen and (max-width: 768px) {
        width: 9rem;
      }
        }
    }

    .links{
      display: flex;
      justify-content: center;
      align-items: center;

      @media  screen and (max-width: 768px) {
        position: fixed;
        bottom: 0px;
        left: 0;
        width: 100%;
        justify-content: space-around;
      }
        a{
            margin: 0 .5rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        img {
          margin-left: .3rem;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          object-fit: cover;
    }
    }

    
  }
}
</style>