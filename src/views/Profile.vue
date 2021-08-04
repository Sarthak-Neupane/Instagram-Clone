<template>
  <base-dialog
    v-if="error"
    @close-dialog="close"
    mode="red"
    circleMode="circleRed"
  >
    <template #title> Couldn't Sign Out. Please Try Again. </template>
    <template #main> {{ error }} </template>
  </base-dialog>
  <main v-else class="profile__container">
    <section>
      <div class="top__half">
        <div class="display_pic">
          <!-- <img src="../assets/profilePic.jpg" alt="" /> -->
          <img :src="getUser.photoURL" alt="" />
        </div>
        <div class="about">
          <div class="header">
            <div class="username"><p>sa_rt_hak</p></div>
            <div class="edit_profile">
              <button>Edit Profile</button>
            </div>
          </div>
          <div class="body">
            <div class="goals">2 goals</div>
            <div class="fans">118 fans</div>
            <div class="following">182 following</div>
          </div>
          <div class="footer">
            <div class="name">Sarthak Neupane</div>
            <!-- <div class="links">
                      </div> -->
          </div>
        </div>
      </div>
    </section>
    <button class="signout" @click="signout">Signout</button>
  </main>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      loading: false,
    };
  },
  computed: {
    getUser() {
      let currentUser = this.$store.getters["auth/get_the_user"];
      if (currentUser) {
        return currentUser;
      } else {
        return JSON.parse(localStorage.getItem("User"));
      }
    },
  },
  methods: {
    async signout() {
      try {
        this.loading = true
        await this.$store.dispatch("auth/sign_out");
        this.loading= false
        this.$router.replace({ name: "Login" });
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },
    close() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 0 15rem;
  width: 100vw;
  height: 100%;

  section {
    width: 100%;

    .top__half {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(2rem + 200px);

      .display_pic {
        width: 30%;
        border: 1px solid black;
        overflow: hidden;
        padding: 1rem;
        height: 100%;

        img {
          height: 170px;
          width: 170px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .about {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 70%;
        height: 100%;
        padding: 1rem;
        border: 1px solid red;
      }
    }
  }
  .signout {
    background: red;
    color: white;
    font-size: 3rem;
  }
}
</style>
