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
  <main v-if="!error && !loading" class="profile__container">
    <section v-if="width > 768">
      <div class="top__half">
        <div class="display_pic">
          <img
            v-if="!getUserInfo.photoURL"
            src="../assets/profile.webp"
            alt=""
          />
          <img v-else :src="getUserInfo.photoURL" alt="" />
        </div>
        <div class="about">
          <div class="header">
            <div class="username">
              <p>{{ getUserInfo.displayName }}</p>
            </div>
            <div class="edit_profile">
              <router-link :to="getEditPath">
                <button>Edit Profile</button>
              </router-link>
            </div>
          </div>
          <div class="body">
            <div class="goals item">
              <span>{{ getUserInfo.goals.length }}</span> goals
            </div>
            <div class="fans item">
              <span>{{ getUserInfo.fans.length }}</span> fans
            </div>
            <div class="following item">
              <span>{{ getUserInfo.following.length }}</span> following
            </div>
          </div>
          <div class="footer">
            <div class="name">{{ getFullname }}</div>
            <div class="bio">
              <p>{{ getUserInfo.bio }}</p>
            </div>
            <div class="website">
              <a :href="getUserInfo.website" target="_blank">{{
                getUserInfo.website
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="mobile_about">
      <div class="top__half">
        <div class="display_pic">
          <img
            v-if="!getUserInfo.photoURL"
            src="../assets/profile.webp"
            alt=""
          />
          <img v-else :src="getUserInfo.photoURL" alt="" />
        </div>
        <div class="about">
          <div class="header">
            <div class="username">
              <p>{{ getUserInfo.displayName }}</p>
            </div>
            <div class="edit_profile">
              <router-link :to="getEditPath">
                <button>Edit Profile</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="name">{{ getFullname }}</div>
        <div class="bio">
          <p>{{ getUserInfo.bio }}</p>
        </div>
        <div class="website">
          <a :href="getUserInfo.website">{{ getUserInfo.website }}</a>
        </div>
      </div>

      <div class="body">
        <div class="goals item">
          <div>{{ getUserInfo.goals.length }}</div>
          goals
        </div>
        <div class="fans item">
          <div>{{ getUserInfo.fans.length }}</div>
          fans
        </div>
        <div class="following item">
          <div>{{ getUserInfo.following.length }}</div>
          following
        </div>
      </div>
    </section>
  </main>
  <div class="bottom">
    <nav>
      <ul>
        <router-link :to=" getPath + 'goals' "> GOALS </router-link>
        <router-link :to="getPath + 'ggtv'"> GGTV </router-link>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
    <button class="signout" @click="signout">Signout</button>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      loading: false,
      width: null,
      id: null,
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
    getCurrentName() {
      return this.$store.getters["auth/get_the_user"].displayName;
    },
    getId() {
      return this.$route.params.id;
    },
    getUserInfo() {
      return this.$store.getters["database/get_user_info"];
    },
    getFullname() {
      if (this.getUserInfo.firstName && this.getUserInfo.lastName) {
        return this.getUserInfo.firstName + " " + this.getUserInfo.lastName;
      } else {
        return this.getUserInfo.displayName;
      }
    },
    getEditPath() {
      return `/${this.getId}/profile/edit/edit`;
    },
    getPath(){
      return `/${this.$route.params.id}/profile/`
    }
  },
  watch:{
    $route(n){
      this.getInformation(n)
    }
  },
  created() {
    window.addEventListener("resize", this.getWidth());
    this.getWidth();
    this.getInformation(this.$route);
  },
  methods: {
    getWidth() {
      this.width = window.innerWidth;
    },
    async getInformation(n) {
      try {
        this.loading = true;
        await this.$store.dispatch("database/getData", n.params.id);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
      }

      console.log(this.getUserInfo);
    },
    async signout() {
      try {
        this.loading = true;
        await this.$store.dispatch("auth/sign_out");
        this.loading = false;
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
  margin: 0 auto;
  width: 100%;
  min-width: 25rem;
  max-width: 50rem;
  height: 100%;
  // min-height: 100vh;

  @media screen and (max-width: 768px) {
    min-width: 100%;
  }

  section {
    width: 100%;

    .top__half {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(2rem + 200px);

      @media screen and (max-width: 768px) {
        height: 100%;
      }
      .display_pic {
        width: 30%;
        overflow: hidden;
        padding: 1rem;
        height: 100%;

        @media screen and (max-width: 768px) {
          width: 40%;
        }

        img {
          height: 170px;
          width: 170px;
          border-radius: 50%;
          object-fit: cover;

          @media screen and (max-width: 768px) {
            width: 100px;
            height: 100px;
          }
        }
      }

      .about {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 70%;
        height: 100%;
        padding: 1rem;

        @media screen and (max-width: 768px) {
          width: 80%;
        }
        // border: 1px solid red;

        .header {
          display: flex;
          width: 100%;

          @media screen and (max-width: 768px) {
            flex-direction: column;
          }

          .username {
            margin-right: 2rem;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-size: 28px;
            color: #262626;
            font-weight: 300;
          }

          .edit_profile {
            // border: 1px solid black;
            display: flex;
            align-items: center;

            @media screen and (max-width: 768px) {
              width: 100%;
            }

            button {
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              font-weight: 600;
              font-size: 14px;
              background: #fafafa;
              border: 1px solid #e4e4e4;
              border-radius: 4px;
              outline: none;
              padding: 0.2rem 0.5rem;

              @media screen and (max-width: 768px) {
                width: 100%;
                margin-top: 1rem;
              }
            }
          }
        }

        .body {
          padding: 1.3rem 0;
          display: flex;

          .item {
            margin-right: 1.1rem;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 400;
            font-size: 1rem;

            span {
              margin-right: 0.1rem;
              font-weight: 600;
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              font-size: 1rem;
            }
          }
        }

        .footer {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          .name {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 600;
            font-size: 1rem;
          }

          .bio {
            text-align: start;
            margin: 0.5rem 0;
            p {
              font-size: 1rem;
              color: #262626;
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            }
          }

          .website {
            a {
              color: #00376b;
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              font-weight: 600;
              font-size: 1rem;
              text-decoration: none;
            }
          }
        }
      }
    }
  }

  .mobile_about {
    width: 100%;

    .footer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 1rem;

      .name {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
        font-size: 1rem;
      }
      .bio {
        text-align: start;
        margin: 0.5rem 0;
        p {
          font-size: 1rem;
          color: #262626;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
      }

      .website {
        a {
          color: #00376b;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
        }
      }
    }

    .body {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      // background: yellow;
      padding: 0.6rem 0.3rem;
      border: 1px solid #cfcfcf;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #262626;
      }
    }
  }

}
  .signout {
    background: red;
    color: white;
    font-size: 3rem;
  }

  .bottom{
    max-width: 60rem;
    margin: 0 auto;

    nav {
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #5e5e5e;
      padding: 0;
  
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        height: 100%;
  
        a {
          text-decoration: none;
          padding: 1rem 1rem;
          color: #5e5e5e;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          margin-right: 2rem;
          font-weight: 600;
          font-size: 12px;
          height: 100%;
          letter-spacing: 0.1rem;
  
          &.router-link-active{
            color: #262626;
            position: relative;
            
  
            &::before{
              content: '';
              position: absolute;
              height: 1px;
              width: 100%;
              background: #262626;
              top: -1px;
              left: 0;
            }
          }
        }
      }
    }
  }

</style>
