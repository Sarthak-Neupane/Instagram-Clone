import { auth, provider } from "../../firebase";

export default {
  async signUp(context, payload) {
    await auth.createUserWithEmailAndPassword(payload.email, payload.password);

    await auth.currentUser.updateProfile({
      displayName: `${payload.username}`,
    });
    context.commit("sign_up_the_user", auth.currentUser);
  },

  async signUpWithGoogle(context) {
   const result = await auth.signInWithPopup(provider)
   const user = result.user

    context.commit("sign_up_the_user", user);
  },

  async logIn(context, payload) {
    await auth.signInWithEmailAndPassword(payload.email, payload.password);
    context.commit("log_in_the_user", auth.currentUser);
  },
};
