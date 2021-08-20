<template>
  <div class="card">
    <div class="header">
        <img @click="changeRoute" v-if="!getUser.photoURL" src="../assets/profile.webp" alt="" />
        <img @click="changeRoute" v-else :src="getUser.photoURL" alt="" />
        <div class="input-field" @click="openAddingPost">
            <span>What's on your mind, {{ getUser.displayName }} </span>
        </div>
    </div>
    <div class="footer">
        <input type="file" id="file">
        <label for="file"> <photo></photo> <span>Photo/Video</span> </label>
    </div>
  </div>
</template>

<script>
import photo from "./ICONS/photo.vue";
export default {
  methods:{
    openAddingPost(){
      this.$emit('openAdd')
    }
  },
  emits:['openAdd'],
  components:{
    photo
  },
  computed: {
    getUser() {
      let currentUser = this.$store.getters["auth/get_the_user"];
      if (currentUser) {
        console.log("1");
        return currentUser;
      } else if (localStorage.getItem("User")) {
        console.log("2");
        return JSON.parse(localStorage.getItem("User"));
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card{
    // background: red;
    margin-top: 3rem;
    border: 1px solid #cfcfcf;
    padding: .4rem 1.4rem;
    border-radius: 5px;
    background: white;

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: .4rem 0;

        img{
            height: 40px;
            width: 40px;
            object-fit: cover;
            border-radius: 50%;
        }

        .input-field{
            background: #f0f2f5;
            width: 90%;
            height: 40px;
            border-radius: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 1rem;
            cursor: pointer;

            &:hover{
                background: #dadfdf;
            }

            span{
                color: rgb(104, 104, 104)
            }
        }
    }

    .footer{
        // background: red;
        margin-top: .4rem;
        padding: .8rem 0;
        border-top: 1px solid #eeeeee;
        display: flex;
        justify-content: center;
        align-items: center;

        input{
            display: none;
        }

        label{
          display: flex;
          justify-content: center;
          align-items: center;

          span{
            margin-left: .3rem;
          }
        }
    }
}
</style>