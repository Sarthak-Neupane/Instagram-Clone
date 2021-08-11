<template>
  <base-dialog
    v-if="error"
    @close-dialog="close"
    mode="red"
    circleMode="circleRed"
  >
    <template #title> Couldn't Log In </template>
    <template #main> {{ error }} </template>
  </base-dialog>
  <section>
    <div class="container">
      <div class="form-contain">
        <div class="header">
          Login to Goal
          <div class="circle"></div>
        </div>
        <form @submit.prevent="login">
          <div class="input1 inputs">
            <input
              type="email"
              id="email"
              name="email"
              class="input"
              v-model="email"
              ref="email"
            />
            <label for="email" class="hello">Email</label>
          </div>

          <div class="input2 inputs">
            <input
              type="password"
              id="password"
              name="password"
              class="input"
              v-model="password"
              ref="password"
            />
            <label for="password" class="hello">Password</label>
          </div>

          <input type="submit" class="submit" value="Login" />
          <div class="para">
            <div class="text"> Don't have an account?</div>
            <div class="link">

            <router-link to="/signup">Sign Up now</router-link>
            </div>
          </div>
          <div class="google_auth">
            <p>OR</p>
            <button type="button" @click="signUpWithGoogle">
              <Google /> <span>Log in with google </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapActions } from "vuex";
import Google from "../components/ICONS/google.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false,
    };
  },
  components: {
    Google,
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/logIn", {
          email: this.email,
          password: this.password,
        });
        const userAccount = this.$store.getters["auth/get_the_user"];
        if (userAccount) {
          this.$router.replace(`/feed`);
        }
      } catch (error) {
        this.error = error.message;
      }
    },
     async signUpWithGoogle() {
      try {
        await this.$store.dispatch("auth/signUpWithGoogle");

        const userAccount = this.$store.getters["auth/get_the_user"];

        if (userAccount) {
          this.$router.replace(`/feed`);
        }
      } catch (error) {
        console.log(error)
        this.error = error.message;
      }
    },
    // labelUpFirstname() {
    //   this.$refs.firstName.nextElementSibling.classList.add("active");
    // },
    // labelUpLastname() {
    //   this.$refs.lastName.nextElementSibling.classList.add("active");
    // },
    // labelUpemail() {
    //   this.$refs.email.nextElementSibling.classList.add("active");
    // },
    // labelUppassword() {
    //   this.$refs.password.nextElementSibling.classList.add("active");
    // },
    close() {
      this.error = null;
    },
  },
   watch:{
      password: function(val){
        if(val !== ""){
         this.$refs.password.nextElementSibling.classList.add("active");
        }else{
           this.$refs.password.nextElementSibling.classList.remove("active");
        }
      },
      email: function(val){
        if(val !== ""){
          this.$refs.email.nextElementSibling.classList.add("active");
        }else{
           this.$refs.email.nextElementSibling.classList.remove("active");
        }
      }
    },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  font-size: 18px;
}
section {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/LoginBackground.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.header {
  background: #189b1e;
  border-bottom: 1px solid black;
  font-size: 2.5rem;
  color: white;
  font-family: "Comic Neue", cursive;
  font-weight: 1000;
  position: relative;

  .circle {
    position: absolute;
    height: 80px;
    width: 80px;
    // background: white;
    background-image: url("../assets/football.jpg");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid green;
  }
}

* {
  color: black;
}

.container {
  width: 30vw;
  min-width: 20rem;
  // height: 80vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  border-radius: 20px;
  background-image: linear-gradient(
    to top right,
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 1)
  );
  backdrop-filter: blur(2px);
  -webkit-box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* padding: 0.3rem; */
}

.container .form-contain {
  width: 100%;
  height: 100%;
  /* padding: 0.9rem; */
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  display: -ms-grid;
  display: grid;
  place-items: center;
}

.container .form-contain .header {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  /* background-image: url("../assets/netflixN.jpg"); */
  background-size: 30%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  padding: 4rem;
}

.container .form-contain .header h1 {
  margin: 0.5rem;
}

.container .form-contain form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 60%;
  padding: 2rem 0;
}

.container .form-contain form .input1,
.container .form-contain form .input2 {
  width: 100%;
  position: relative;
  margin: 0.5rem 0;
}

.container .form-contain form .input1 label,
.container .form-contain form .input2 label {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-20%, -50%);
  transform: translate(-20%, -50%);
  left: 20%;
  font-size: 15px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  cursor: text;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.container .form-contain form .input1 label.active,
.container .form-contain form .input2 label.active {
  font-size: 10px;
  top: 0%;
  left: 15%;
  opacity: 0.5;
}

.container .form-contain form input {
  padding: 5px 10px;
  width: 80%;
  margin: 0.8rem 0;
  outline: none;
  border: none;
  text-align: left;
  background: none;
  border-left: 5px solid #16811c;
  border-right: 5px solid #16811c;
}

.container .form-contain form .submit {
  margin-bottom: 1.3rem;
  border: none;
  height: 30px;
  background-color: #16811c;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 15px;
  /* padding: 0.5rem; */
  text-align: center;
  border: 1px solid #16811c;
  cursor: pointer;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
  font-size: 0.9rem;
  font-weight: 500;
}

.container .form-contain form .submit:hover {
  border: 1px solid #16811c;
  background: none;
  color: black;
}

.container .form-contain form .para {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.container .form-contain form .para a {
  text-decoration: none;
  color: #16811c;
  padding: 0.4rem;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.title {
  font-size: 2.4rem;
}

.dialog {
  position: absolute;
  top: 0;
  left: 0;
}

.google_auth {
  margin: 1rem 0;
  width: 100%;

  p {
    margin: 1rem 0 0 0;
    width: 100%;
    text-align: center;
  }

  button {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    background: none;
    background: whitesmoke;
    box-shadow: 1px 1px 8px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    font-size: 18px;
    padding: 0.4rem 0.5rem;
    cursor: pointer;

    &:hover {
      background: rgb(253, 240, 240);
    }

    span {
      margin: 0 1rem;
      color: rgb(153, 153, 153);
    }
  }
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 1.3rem;
  }
}
@media screen and (min-width: 768px) {
  .container{
    width: 30rem;
    // height: 60vh;
  }
}
@media screen and (max-width: 1200px) {
  .para{
    flex-direction: column;
  }

}
</style>
