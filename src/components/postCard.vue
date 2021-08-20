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
  <div class="backdrop" @click="closePost"></div>
  <div class="card">
    <div class="topic">
      <h1>Create Post</h1>
      <close @click="closePost"> </close>
    </div>
    <div class="header">
      <img
        @click="changeRoute"
        v-if="!getUser.photoURL"
        src="../assets/profile.webp"
        alt=""
      />
      <img @click="changeRoute" v-else :src="getUser.photoURL" alt="" />
      <div class="name">
        <h2>{{getUser.displayName}}</h2>
        <div class="radio">
          <div class="public">
            <input
              type="radio"
              id="public"
              name="friends/public"
              value="public"
              v-model="radio"
            />
            <label for="public">Public</label>
          </div>
          <div class="friends">
            <input
              type="radio"
              id="friends"
              checked
              name="friends/public"
              value="friend"
              v-model="radio"
            />
            <label for="friends">Friends</label>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <textarea
        v-model="caption"
        placeholder="What's on your mind, Sartman"
        rows="5"
      ></textarea>
      <!-- <input type="text" placeholder="What's on your mind, Sartman" /> -->
    </div>
    <div class="footer">
      <!-- <img src="../assets/LoginBackground.jpg" /> -->
    </div>
    <div class="add-to-post">
      <h2>Add To Your Post</h2>
      <input type="file" id="postPic" ref="file" />
      <label for="postPic"> <photo></photo> </label>
    </div>
    <button @click="sendPost" :class="{ disable: !getDatas }">
      Post
    </button>
  </div>
</template>

<script>
import close from "./ICONS/close.vue";
import photo from "./ICONS/photo.vue";
export default {
  components: { close, photo },
  emits: ["closePost"],
  data() {
    return {
      incomplete: true,
      caption: null,
      radio: "friend",
      loading: false,
      error: null,
    };
  },
  methods: {
    closePost(value) {
      this.$emit("closePost", value);
    },
    close(){
      this.error = null
    },
    async sendPost() {
      const file = this.$refs.file.files[0];

      try {
          if (this.caption && this.radio) {
        this.loading = true,
        await this.$store.dispatch("storage/addPost", {
          id: this.getUser.uid,
          author: this.getUser.displayName,
          authorPic: this.getUser.photoURL,
          file: file,
          likes: 0,
          caption: this.caption,
          visible: this.radio,
          comments: 0,
          allComments: [],
          allLikes: [],
          time: new Date().getTime(),
        });
        this.closePost('noConfirm')
        this.loading = false
      } else {
        this.error = 'Please fill all the fields'
        console.log("missing");
      }
      } catch (error) {
        this.loading = false
        this.error = error.message
        this.closePost('noConfirm')
      }

      // console.log(file)
      // console.log(this.caption)
      // console.log(this.radio)
      // console.log(new Date().getTime())
    },
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
        getDatas() {
      if (this.caption && this.radio) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(51, 51, 51, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.card {
  background: white;
  padding: 1rem;
  width: 30rem;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  .topic {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      width: 100%;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #050505;
      text-align: center;
    }
  }

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 0;

    img {
      height: 40px;
      width: 40px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 1rem;
    }

    .name {
      h2 {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 15px;
        font-weight: 600;
        color: #050505;
      }
      .radio {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.3rem;

        .public,
        .friends {
          margin-right: 1rem;

          input {
            margin-right: 0.4rem;
          }

          label {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
    }
  }

  .body {
    width: 100%;

    textarea {
      border: none;
      padding: 1rem 0;
      outline: none;
      width: 100%;
      min-height: 40px;
      // max-height: 50px;
      overflow: auto;
      resize: none;
    }
  }

  .add-to-post {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 0.5rem;
    border: 1px solid #c9c9c9;
    border-radius: 8px;
    margin-top: 1rem;

    h2 {
      font-size: 1rem;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
    }

    input {
      display: none;
    }
  }

  .footer {
    min-height: 5rem;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  button {
    margin-top: 1rem;
    width: 100%;
    background: #1877f2;
    color: white;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    font-size: 15px;
    border: none;
    outline: none;
    padding: 0.5rem 0rem;
    border-radius: 7px;
  }

  .disable {
    opacity: 0.4;
  }
}
</style>