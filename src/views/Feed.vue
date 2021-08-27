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
  <post-card v-if="addingPost" @closePost="closeDialog"></post-card>
  <div class="main" v-if="!loading && givePost">
    <addPost @openAdd="openDialog"></addPost>
    <post
      v-for="post in givePost"
      :key="post.time"
      :author="post.author"
      :authorURL="post.authorPic"
      :imageURL="post.file"
      :likes="post.likes"
      :caption="post.caption"
      :topComment="topComment(post)"
      :topCommentAuthor="topCommentAuthor(post)"
      :time="post.time"
      :id="post.id"
      :parent="post.parentId"
    >
    </post>
  </div>
</template>

<script>
import post from "../components/BaseUi/BasePost.vue";
import addPost from "../components/addPost.vue";
import postCard from "../components/postCard.vue";
export default {
  components: {
    post,
    addPost,
    postCard,
  },
  data() {
    return {
      error: null,
      loading: false,
      addingPost: false,
      post: [],
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    openDialog() {
      this.addingPost = true;
    },
    topComment(post) {
      if (post.allComments.length > 0) {
        return post.allComments[0];
      } else {
        return null;
      }
    },
    topCommentAuthor(post) {
      if (post.allComments.length > 0) {
        return post.allComments[0].author;
      } else {
        return null;
      }
    },
    async closeDialog(value) {
      console.log(value);
      if (value === "noConfirm") {
        this.addingPost = false;
      } else {
        const confirmNow = confirm("Changes are not saved. Data will be lost");
        console.log(confirmNow);
        if (confirmNow) {
          this.addingPost = false;
        }
      }
    },

    async getPosts() {
      try {
        this.loading = true;
        await this.$store.dispatch("database/getPosts");
        this.loading = false;
        const posts = this.$store.getters["database/getPosts"];
        posts.sort((a, b) => {
          if (a.time < b.time) {
            return 1;
          } else {
            return -1;
          }
        });
        this.post = posts
        console.log(posts);
      } catch (error) {
        this.loading = false;
        this.error = error.message;
      }
    },
    close() {
      this.error = null;
    },
  },
  computed: {
    givePost() {
      //  return this.$store.getters['database/getPosts']
      // return this.$store.getters["database/getPosts"];
      return this.post
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  place-content: center;
}
</style>
