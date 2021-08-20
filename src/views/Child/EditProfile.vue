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
  <div v-if="!error && !loading" class="main">
    <form @submit.prevent="submitData">
      <div class="change-photo">
        <div class="image first">
          <img
            v-if="getPhoto === null"
            src="../../assets/profile.webp"
            alt=""
          />
          <img v-else :src="getPhoto" alt="" />
        </div>
        <div class="header">
          <p>{{ getUserInfo.displayName }}</p>
          <div class="profile_upload">
            <label for="file">Change Profile Photo</label>
            <input type="file" id="file" @change="updateProfile" ref="file" />
          </div>
        </div>
      </div>
      <div class="name">
        <label class="first" for="name1">Name</label>
        <input
          type="text"
          class="second"
          id="name1"
          v-model.trim="name"
          @change="formChanged"
        />
      </div>
      <div class="username">
        <label class="first" for="username1">Username</label>
        <div class="username_side">
          <input
            type="text"
            id="username1"
            @change="formChanged"
            v-model.trim="username"
          />
          <p>
            In most cases, you'll be able to change your username back to
            s_art_hak_ for another 14 days.
          </p>
        </div>
      </div>
      <div class="website">
        <label class="first" for="website1">Website</label>
        <input
          type="url"
          class="second"
          id="website1"
          v-model.trim="website"
          @change="formChanged"
        />
      </div>
      <div class="bio">
        <label class="first" for="bio1">Bio</label>
        <textarea
          id="bio1"
          class="second"
          cols="30"
          rows="10"
          v-model.trim="bio"
          @change="formChanged"
        ></textarea>
      </div>
      <div class="personal_info">
        <h5>Personal Information</h5>
        <p>
          Provide your personal information, even if the account is used for a
          business, a pet or something else. This won't be a part of your public
          profile.
        </p>
      </div>
      <div class="email">
        <label class="first" for="email1">Email</label>
        <input
          class="second emailInput"
          type="email"
          id="email1"
          @change="formChanged"
          v-model.trim="email"
          readonly
        />
      </div>
      <div class="gender">
        <label class="first" for="gender1">Gender</label>
        <input
          class="second"
          type="text"
          id="gender1"
          @change="formChanged"
          v-model.trim="gender"
        />
      </div>
      <div class="similarAccountSuggest">
        <label class="first" for="similar1">Similar Account Suggestions</label>
        <div class="checkbox second">
          <input type="checkbox" id="similar1" />
          <label class="second1" for="similar1">
            Include your account when recommending similar accounts people might
            want to follow</label
          >
        </div>
      </div>
      <button :disabled="disable">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      disable: true,
      response: null,
      name: null,
      website: null,
      username: null,
      bio: null,
      email: null,
      gender: null,
    };
  },
  computed: {
    getPhoto() {
      return this.$store.getters["auth/get_the_user"].photoURL;
    },
    getEmail() {
      return this.$store.getters["auth/get_the_user"].email;
    },
    getUserInfo() {
      return this.$store.getters["database/get_user_info"];
    },
    getId() {
      return this.$route.params.id;
    },
    getFullName() {
      if (
        this.getUserInfo.firstName !== null &&
        this.getUserInfo.lastName !== null
      ) {
        return this.getUserInfo.firstName + " " + this.getUserInfo.lastName;
      } else {
        return this.getUserInfo.displayName;
      }
    },
  },

  methods: {
    async getInformation() {
      try {
        this.loading = true;
        await this.$store.dispatch("database/getData", this.getId);
        const response = this.$store.getters["database/get_user_info"];
        if (response.firstName !== null && response.lastName !== null) {
          response.name = response.firstName + " " + response.lastName;
        } else {
          response.name = response.displayName;
        }
        this.loading = false;
        this.response = response;
        this.name = response.name;
        this.website = response.website;
        this.username = response.displayName;
        this.bio = response.bio;
        this.email = this.getEmail;
        this.gender = response.gender;
      } catch (error) {
        this.error = error.message;
      }
    },

    async updateProfile() {
      const file = this.$refs.file.files[0];

      try {
        this.loading = true;
        await this.$store.dispatch("storage/changeProfilePic", {
          id: this.getId,
          file: file,
        });
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = null;
      }
    },

    formChanged() {
      this.disable = false;
    },

    close() {
      this.error = null;
    },

    async submitData() {
      console.log("hello");
      try {
        this.loading = true;
        await this.$store.dispatch("database/updateProfile", {
          id: this.getId,
          name: this.name,
          displayName: this.username,
          website: this.website,
          bio: this.bio,
          gender: this.gender,
        });
        this.loading = false;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
  async created() {
    await this.getInformation();
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  position: absolute;
  top: 0;
  left: 0;
}

.error {
  color: red;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    .first {
      width: 15rem;
      max-width: 20rem;
      min-width: 15rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      color: #262626;
    }
    .second {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 1rem;
    }

    & > div {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      width: 100%;
    }

    input {
      width: 16rem;
      padding: 0.2rem 0.3rem;
      border: 1px solid #cfcfcf;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 1rem;
      color: #262626;

      // &:focus{
      //   border: 1px solid #cfcfcf;
      // }
    }

    textarea {
      width: 16rem;
      padding: 0.2rem 0.3rem;
      height: 3rem;
      border: 1px solid #cfcfcf;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 1rem;
      color: #262626;
    }

    .change-photo {
      .image {
        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .header {
        margin-left: 1rem;
        width: 100%;
        p {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 400;
          color: #262626;
          font-size: 20px;
        }

        .profile_upload {
          label {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            color: #0095f6;
            font-weight: 600;
            cursor: pointer;
          }

          input {
            display: none;
          }
        }
      }
    }

    .username {
      align-items: flex-start;

      .username_side {
        margin-left: 1rem;

        p {
          margin-top: 0.4rem;
          font-size: 12px;
          color: #8e8e8e;
          font-weight: 400;
          font-family: "Segoe UI", Geneva, Verdana, sans-serif;
          max-width: 70%;
        }
      }
    }

    .personal_info {
      flex-direction: column;
      justify-content: center;
      width: 50%;
      margin-left: 11rem;

      h5 {
        text-align: left;
        width: 100%;
        font-size: 14px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
        color: #8e8e8e;
      }

      p {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 12px;
        font-weight: 400;
        color: #8e8e8e;
      }
    }

    .similarAccountSuggest {
      .second {
        max-width: 40%;

        .second1 {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #262626;
        }
      }
    }

    .emailInput {
      background: #efefef;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  button {
    padding: 0.4rem 0.7rem;
    background: #0095f6;
    border-radius: 3px;
    border: none;
    outline: none;
    color: #fafafa;
    font-size: 14px;
    font-weight: 600;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin: 1rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
</style>